<template>
  <div id="app">
    <vue-extend-layouts/>
  </div>
</template>

<script>
import Vue from 'vue';
import VueExtendLayouts from 'vue-extend-layout'

import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css' // needs css-loader
import { Map, TileLayer, OsmSource, Geoloc } from 'vuelayers'
import 'vuelayers/lib/style.css' // needs css-loader
import { DrawInteraction } from 'vuelayers'

Vue.use(DrawInteraction)
Vue.use(Map)
Vue.use(TileLayer)
Vue.use(OsmSource)
Vue.use(Geoloc)
Vue.use(VueLayers)
Vue.use(VueLayers, {
  dataProjection: 'EPSG:4326',
})

export default {
  name: 'App',
  components: {
    VueExtendLayouts
  }
}
</script>

<style lang="scss">
</style>