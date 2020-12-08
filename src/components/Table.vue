<template>
  <div class="table">
    <b-row>
      <b-col md="6">
        <b-form-input v-model="search" placeholder="Поиск" class="mb-3"></b-form-input>
      </b-col>
    </b-row>

    <div class="text-center" v-if="isLoading">
      <b-spinner variant="secondary"></b-spinner>
    </div>
    <p class="text-danger" v-else-if="textDanger">{{textDanger}}</p>
    <b-table
        v-else
        thead-class="bg-light"
        small
        hover
        :items="filter"
        :fields="tableFields"
        :current-page="curPage"
        :per-page="0"
        sort-compare-locale="en">
      <template v-slot:cell(actions)="item">
          <slot v-bind:item="item.item"></slot>
          <slot name="delivery" v-bind:item="item.item"></slot>
      </template>
    </b-table>
    <b-pagination v-if="pagination" size="md" :total-rows="totalItems" v-model="curPage" :per-page="perPage"></b-pagination>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    getData: {
      type: Function
    },
    tableFields: {
      type: Array
    },
    perPage: {
      type: Number,
      default: 20
    },
    queryParams: {
      type: Object,
      default: null
    },
    itemToAdd: {
      type: Object
    },
    idToDelete: {
      type: String,Number
    },
  },
  data(){
    return {
      isLoading: true,
      search: '',
      data: [],
      textDanger: '',
      isModalShown: false,
      modalText: '',
      curPage: 1,
      totalItems: 0,
      pagination: false
    }
  },
  computed: {
    prep(){
      return this.data.map(cur => ({
        ...cur
      }))
    },
    filter(){
      if(this.search.length){
        return this.prep.filter(cur => {
          let find = Object.values(cur).filter(el => {
            if(typeof el === 'string' && el.toLowerCase().indexOf(this.search.toLowerCase()) !== -1){
              return el
            }
          })
          if(find.length){
            return cur
          }
        })
      }else{
        return this.prep
      }
    }
  },
  watch:{
    curPage:{
      handler(val){
        this.isLoading = true
        this.setData(val)
      }
    },
    filter:{
      handler(val){
        if(!val.length){
          this.textDanger = 'Пусто'
        }else{
          this.textDanger = ''
        }
      }
    },
    idToDelete:{
      handler(id){
        const itemIdx = this.data.findIndex(item=>item.id === id)
        if(itemIdx > -1){
          this.data.splice(itemIdx,1)
        }
      }
    },
    itemToAdd:{
      handler(newItem){
        console.log(newItem)
        console.log(this.data.filter(item=>item.id===newItem.id).length)
        if(!this.data.filter(item=>item.id===newItem.id).length){
          this.data.push(newItem)
        }
      },
      deep: true
    },
  },
  methods:{
    async setData(curPage){
      const data = await this.getData({pageIdx: curPage-1, perPage: this.perPage,...(this.queryParams && { [this.queryParams.key]: this.queryParams.value})})
      this.isLoading = false

      if(data.error){
        this.textDanger = data.error
      }else{
        if(data.items){
          this.data = data.items
          this.totalItems = data.paginationInfo.count
          this.pagination = true
        }else{
          this.data = data
        }
      }
    },
  },
  async mounted() {
    this.setData(this.curPage)
  }
}
</script>

<style lang="scss" scoped>
.page{
  padding: 28px 0;
}
h1{
  margin-top: 0;
  margin-bottom: 22px;
  font-size: 24px;
}
</style>