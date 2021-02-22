<template>
  <div class="page collections-page">
    <b-row class="row">
      <b-col md="9">
        <h1>Продукты</h1>

        <b-row>
          <b-col md="6">
            <b-form-input v-model="productSearchName" placeholder="Название" class="mb-3"></b-form-input>
          </b-col>
          <b-col md="6">
            <b-form-input v-model="productSearchArticle" placeholder="Артикул" class="mb-3"></b-form-input>
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
            :items="productsPrep"
            :fields="tableFields"
            :current-page="curPage"
            :per-page="0"
            sort-compare-locale="en">
          <template v-slot:cell(actions)="item">
            <router-link :to="{ name:'editProducts', params: { id: item.item.id }}">
              <b-button size="sm" variant="info" class="mr-2">
                <b-icon icon="pencil"></b-icon>
              </b-button>
            </router-link>
          </template>
        </b-table>
        <b-row>
          <b-col sm="8" class="d-flex align-items-center">
            <b-pagination class="mr-3 mb-0" size="md" :total-rows="totalItems" v-model="curPage" :per-page="perPage"></b-pagination>
            <b-form class="d-flex align-items-center" @submit="goToPage">
              <b-form-input class="mr-3" v-model="goToPageNum" type="number" size="sm" placeholder="1"></b-form-input>
              <b-button type="submit" size="sm" variant="primary"><b-icon icon="arrow-right-short"></b-icon></b-button>
            </b-form>
          </b-col>
          <b-col sm="4" class="text-right">
            <p>Всего страниц: {{totalPages}}</p>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="3">
        <b-form-group label="Фильтр по статусу">
          <b-form-radio-group
              id="btn-radios-3"
              v-model="selectedStatus"
              :options="statusOptions"
              buttons
              stacked
              name="radio-btn-stacked"
              class="w-100"
              button-variant="outline-secondary"
          ></b-form-radio-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-modal v-model="isModalShown" id="modal-sm" size="sm" ok-only >{{modalText}}</b-modal>
  </div>
</template>

<script>
import ProductsService from "@/services/productsService";
const service = new ProductsService()
import _ from 'lodash'

export default {
  name: 'Products',
  data(){
    return {
      isLoading: true,
      productSearchName: '',
      productSearchArticle: '',
      products: [],
      textDanger: '',
      isModalShown: false,
      modalText: '',
      corners: [],
      tableFields: [
        {
          key: 'name',
          label: 'Название',
          sortable: true
        },
        {
          key: 'description',
          label: 'Описание',
          sortable: true
        },
        {
          key: 'cornerName',
          label: 'Корнер',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'revision',
          label: 'Версия',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'actions',
          label: '',
          sortable: false
        },
      ],
      curPage: 1,
      totalItems: 0,
      perPage: 20,
      totalPages: 0,
      goToPageNum: '',

      selectedStatus: 'all',
      statusOptions: [
        { text: 'Все', value: 'all' },
        { text: 'Реальность', value: 'Resolve' },
        { text: 'Ожидание', value: 'Pending'},
        { text: 'Отклонено', value: 'Reject' }
      ]
    }
  },
  computed: {
    productsPrep(){
      return this.products.map(cur => {
        const corner = this.corners.find(item => item.id === cur.cornerId)
        return {
          ...cur,
          cornerName: corner !== undefined ? corner.name : 'Не выбран',
        }
      })
    },
  },
  watch:{
    productsPrep:{
      handler(val){
        if(!val.length){
          this.textDanger = 'Ни одного продукта не найдено'
        }else{
          this.textDanger = ''
        }
      }
    },
    productSearchName: {
      handler(val){
        this.curPage = 1
        this.selectedStatus = 'all'

        if(val.length || this.productSearchArticle.length) {
          this.debouncer()
        }else{
          this.getProducts(1, 'all')
        }
      }
    },
    productSearchArticle: {
      handler(val){
        this.curPage = 1
        this.selectedStatus = 'all'
        
        if(val.length || this.productSearchName.length) {
          this.debouncer()
        }else{
          this.getProducts(1, 'all')
        }
      }
    }
  },
  methods:{
    debouncer: _.debounce(function (){this.getProductByFilter()}, 500),
    async getProductByFilter(){
      console.log('getProductByFilter')
      this.isLoading = true

      const name = this.productSearchName
      const article = this.productSearchArticle

      const data = await service.getProductByFilter({name,article})
      if(data !== 'loading') {
        this.isLoading = false

        if (data.error) {
          this.textDanger = data.error
        } else {
          this.products = data.items
          this.totalItems = data.paginationInfo.count
          this.totalPages = data.paginationInfo.pages
        }
      }
    },
    goToPage(e){
      e.preventDefault()
      const intVal = parseInt(this.goToPageNum)
      if(!isNaN(intVal)){
        if(intVal > 0 && intVal <= this.totalPages){
          this.curPage = intVal
          this.goToPageNum = ''
        }else{
          this.goToPageNum = ''
        }
      }
    },
    async getProducts(curPage, curStatus){
      this.isLoading = true

      let data
      if(curStatus === 'all'){
        data = await service.getProducts({pageIdx: curPage-1, perPage: this.perPage})
      }else{
        data = await service.getProductsByStatus({pageIdx: curPage-1, perPage: this.perPage, curStatus: curStatus})
      }

      if(data !== 'loading') {
        this.isLoading = false

        if (data.error) {
          this.textDanger = data.error
        } else {
          this.products = data.items
          this.totalItems = data.paginationInfo.count
          this.totalPages = data.paginationInfo.pages
        }
      }
    },
    async getCorners(){
      const data = await service.getCorners()

      if(data.error){
        this.textDanger = data.error
      }else{
        this.corners = data
      }
    }
  },
  async mounted() {
    this.getCorners()

    this.$watch(vm => [vm.curPage, vm.selectedStatus], (val,oldVal) => {
      const curPage = val[0],
            prevPage = oldVal ? oldVal[0] : null,
            curStatus = val[1],
            prevStatus = oldVal ? oldVal[1] : null

      if(prevStatus !== null && curStatus !== prevStatus) {
        this.curPage = 1

        if(curPage === prevPage){
          this.getProducts(curPage, curStatus)
        }
      }else{
        this.getProducts(curPage, curStatus)
      }

    }, {
      immediate: true
    })
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