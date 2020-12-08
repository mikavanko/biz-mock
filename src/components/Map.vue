<template>
  <div class="map">
    <b-icon ref="iconPoint" class="marker marker--point" font-scale="2" icon="geo-alt" @click="changeType('point')"></b-icon>
    <b-icon ref="iconZone" class="active marker marker--zone" font-scale="2" icon="map" @click="changeType('zone')"></b-icon>
    <vl-map ref="map" style="height: 400px" data-projection="EPSG:4326">
      <vl-view :zoom.sync="zoom" :center.sync="center" :z-index="0"></vl-view>

      <vl-layer-tile :z-index="2">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>

      <vl-feature :z-index="5">
        <vl-geom-point v-if="this.point" :coordinates="this.mapPoint"></vl-geom-point>

        <vl-style-box>
          <vl-style-circle :radius="5">
            <vl-style-fill color="red"></vl-style-fill>
            <vl-style-stroke color="red"></vl-style-stroke>
          </vl-style-circle>
        </vl-style-box>
      </vl-feature>

      <vl-layer-vector :z-index="10">
        <vl-source-vector :features.sync="features" :ident="drawTarget"></vl-source-vector>

        <vl-style-box>
          <vl-style-stroke color="green" :width="1"></vl-style-stroke>
          <vl-style-fill color="rgba(255,255,255,0.5)"></vl-style-fill>
        </vl-style-box>
      </vl-layer-vector>


      <vl-interaction-draw :type="drawType" :source="drawTarget" @drawstart="drawstart">
        <vl-style-box>
          <vl-style-stroke color="blue" :width="1"></vl-style-stroke>
          <vl-style-fill color="rgba(255,255,255,0.5)"></vl-style-fill>
        </vl-style-box>
      </vl-interaction-draw>

    </vl-map>
  </div>
</template>

<script>
export default {
  name: 'Map',
  props:['point','deliveryzone'],
  data () {
    const defaultCenter = [37.618423,55.751244]
    return {
      defaultCenter,
      drawTarget: `draw-target-${Date.now()}`,
      zoom: 14,
      center: this.deliveryzone ? this.centerPolygon(this.deliveryzone.coordinates[0]) : defaultCenter,
      features: [],
      mapPoint: this.point ? this.point.coordinates : defaultCenter,
      drawType: 'Polygon'
    }
  },
  created() {
  },
  mounted(){
    if(this.deliveryzone) {
      this.loadFeatures().then(features => {
        this.features = features
      })
    }
  },
  watch: {
    features(current){
      if(current.length > 0){
        if(current.length === 1 && current[0].geometry.type === 'Polygon'){
          this.$emit('update:deliveryzone', current[0].geometry)
        }else{
          const point = current.filter(item => item.geometry.type === 'Point')[0]
          this.mapPoint = point.geometry.coordinates
          this.$emit('update:point', point.geometry)

          this.features.pop()
        }
      }
    }
  },
  methods:{
    changeType(type){
      if(type === 'point'){
        this.$refs.iconPoint.classList.add('active')
        this.$refs.iconZone.classList.remove('active')

        this.drawType = 'Point'

        if(this.point){
          this.center = this.mapPoint
        }
      }else{
        this.$refs.iconZone.classList.add('active')
        this.$refs.iconPoint.classList.remove('active')

        this.drawType = 'Polygon'

        if(this.features[0])
        this.center = this.centerPolygon(this.features[0].geometry.coordinates[0])

      }
    },
    drawstart(){
      if(this.drawType === 'Polygon'){
        this.features = []
      }
    },
    centerPolygon(arr){
      let minX, maxX, minY, maxY;
      for (let i = 0; i < arr.length; i++){
        minX = (arr[i][0] < minX || minX == null) ? arr[i][0] : minX;
        maxX = (arr[i][0] > maxX || maxX == null) ? arr[i][0] : maxX;
        minY = (arr[i][1] < minY || minY == null) ? arr[i][1] : minY;
        maxY = (arr[i][1] > maxY || maxY == null) ? arr[i][1] : maxY;
      }
      return [(minX + maxX) / 2, (minY + maxY) / 2];
    },
    loadFeatures(){
      return new Promise(resolve=>{
        resolve(
            this.deliveryzone.coordinates.map(cur=>{
              return {
                type: "Feature",
                geometry: {
                  type: this.deliveryzone.type,
                  coordinates: [[...cur]],
                }
              }
            })
        )
      })
    }
  }
}
</script>

<style lang="scss">
.ol-attribution.ol-unselectable.ol-control.ol-uncollapsible {
  display: none !important;
}
.map{
  position: relative;
}
.marker{
  position: absolute;
  left: 10px;
  z-index: 1;
  cursor: pointer;

  &.active{
    color: green;
  }

  &:hover{
    opacity: .7;
  }

  &--point{
    top: 70px;
  }
  &--zone{
    top: 112px;
  }
}
</style>