<template>
    <div class="breadcrumbs" v-if="this.$route.path !== '/'">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <b-breadcrumb class="mb-0 pl-0 pr-0" :items="breadcrumbsItems"></b-breadcrumb>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  mounted(){
  },
  computed:{
    breadcrumbsItems(){
      return this.$route.meta.breadcrumb.map((item,idx,arr)=>{
        let route = {}

        if(idx !== arr.length - 1){
          route.text = item.text
          route.to = {name: item.name}
        }else{
          if(this.$route.name === 'edit' || this.$route.name === 'editCorners'){
            if(this.$store.getters.FOODHALL_BY_ID !== null){
              route.text = this.$store.getters.FOODHALL_BY_ID.name
            }else if(this.$store.getters.CORNER_BY_ID !== null){
              route.text = this.$store.getters.CORNER_BY_ID.name
            }
          }else{
            route.text = item.text
          }
          route.active = true
        }

        return route
      })
    }
  }
}
</script>

<style lang="scss">
  .breadcrumb{
    background-color: transparent;
  }
  .breadcrumbs{
    background-color: #F8F8F8;

    a{
      color: #000;
    }
  }
</style>