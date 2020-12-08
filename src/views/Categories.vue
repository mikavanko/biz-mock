<template>
  <div class="page categories-page">
    <b-row class="row">
      <b-col md="9">
        <h1>Категории</h1>

        <b-row>
          <b-col md="6">
            <b-form-input v-model="categoriesSearch" placeholder="Поиск" class="mb-3"></b-form-input>
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
            :items="filterCategories"
            :fields="tableFields"
            :current-page="curPage"
            :per-page="0"
            sort-compare-locale="en">
          <template v-slot:cell(image)="item">
            <div class="table-img text-center" v-if="item.item.image && item.item.image.url">
              <img :src="item.item.image.url" :alt="item.item.name">
            </div>
          </template>
          <template v-slot:cell(actions)="item">
            <router-link :to="{ name:'editCategories', params: { id: item.item.id }}">
              <b-button size="sm" variant="info" class="mr-2">
                <b-icon icon="pencil"></b-icon>
              </b-button>
            </router-link>
          </template>
        </b-table>
        <b-pagination size="md" :total-rows="totalItems" v-model="curPage" :per-page="perPage"></b-pagination>
      </b-col>
      <b-col md="3">
        <router-link :to="{ name:'createCategories'}" class="input-submit"><b-button>Добавить категорию</b-button></router-link>
      </b-col>
    </b-row>
    <b-modal v-model="isModalShown" id="modal-sm" size="sm" ok-only >{{modalText}}</b-modal>
  </div>
</template>

<script>
import CategoryService from "@/services/categoryService"
const service = new CategoryService()

export default {
  name: 'Categories',
  data(){
    return {
      isLoading: true,
      categoriesSearch: '',
      categories: [],
      textDanger: '',
      isModalShown: false,
      modalText: '',
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
          key: 'showPriority',
          label: 'Приоритет',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'image',
          label: 'Миниатюра',
          sortable: false
        },
        {
          key: 'actions',
          label: '',
          sortable: false
        },
      ],
      curPage: 1,
      totalItems: 0,
      perPage: 50,
    }
  },
  computed: {
    categoriesPrep(){
      return this.categories.map(cur => ({
        ...cur,
        showPriority: cur.showPriority.toString()
      }))
    },
    filterCategories(){
      if(this.categoriesSearch.length){
        return this.categoriesPrep.filter(cur => {
          let find = Object.values(cur).filter(el => {
            if(typeof el === 'string' && el.toLowerCase().indexOf(this.categoriesSearch.toLowerCase()) !== -1){
              return el
            }
          })
          if(find.length){
            return cur
          }
        })
      }else{
        return this.categoriesPrep
      }
    }
  },
  watch:{
    curPage:{
      handler(val){
        this.isLoading = true
        this.getCategories(val)
      }
    },
    filterCategories:{
      handler(val){
        if(!val.length){
          this.textDanger = 'Ни одной категории не найдено'
        }else{
          this.textDanger = ''
        }
      }
    }
  },
  methods:{
    async getCategories(curPage){
      const data = await service.getCategories({pageIdx: curPage-1, perPage: this.perPage})
      console.log(data)
      this.isLoading = false

      if(data.error){
        this.textDanger = data.error
      }else{
        this.categories = data.items
        this.totalItems = data.paginationInfo.count
      }
    }
  },
  async mounted() {
    this.getCategories(this.curPage)
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
.table{
  overflow: auto;
  display: block;
  width: 100%;
}
.table-img{
  width: 30px;
  height: 30px;
  margin: 0 auto;

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>