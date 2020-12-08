<template>
  <div class="page collections-page">
    <b-row class="row">
      <b-col md="9">
        <h1>Коллекции</h1>

        <b-row>
          <b-col md="6">
            <b-form-input v-model="collectionsSearch" placeholder="Поиск" class="mb-3"></b-form-input>
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
            :items="filterCollections"
            :fields="tableFields"
            :current-page="curPage"
            :per-page="0"
            sort-compare-locale="en">
          <template v-slot:cell(actions)="item">
            <router-link :to="{ name:'editCollections', params: { id: item.item.id }}">
              <b-button size="sm" variant="info" class="mr-2">
                <b-icon icon="pencil"></b-icon>
              </b-button>
            </router-link>
          </template>
        </b-table>
        <b-pagination size="md" :total-rows="totalItems" v-model="curPage" :per-page="perPage"></b-pagination>
      </b-col>
      <b-col md="3">
        <router-link :to="{ name:'createCollection'}" class="input-submit"><b-button>Добавить коллекцию</b-button></router-link>
      </b-col>
    </b-row>
    <b-modal v-model="isModalShown" id="modal-sm" size="sm" ok-only >{{modalText}}</b-modal>
  </div>
</template>

<script>
import CollectionsService from "@/services/collectionsService"
const service = new CollectionsService()

export default {
  name: 'Collections',
  data(){
    return {
      isLoading: true,
      collectionsSearch: '',
      collections: [],
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
          key: 'showInMainMenu',
          label: 'Главный экран',
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
    collectionsPrep(){
      return this.collections.map(cur => ({
        ...cur,
        showInMainMenu: cur.showInMainMenu ? 'Да' : 'Нет',
        showPriority: cur.showPriority.toString()
      }))
    },
    filterCollections(){
      if(this.collectionsSearch.length){
        return this.collectionsPrep.filter(cur => {
          let find = Object.values(cur).filter(el => {
            if(typeof el === 'string' && el.toLowerCase().indexOf(this.collectionsSearch.toLowerCase()) !== -1){
              return el
            }
          })
          if(find.length){
            return cur
          }
        })
      }else{
        return this.collectionsPrep
      }
    }
  },
  watch:{
    curPage:{
      handler(val){
        this.isLoading = true
        this.getCollections(val)
      }
    },
    filterCollections:{
      handler(val){
        if(!val.length){
          this.textDanger = 'Ни одной коллекции не найдено'
        }else{
          this.textDanger = ''
        }
      }
    }
  },
  methods:{
    async getCollections(curPage){
      const data = await service.getCollections({pageIdx: curPage-1, perPage: this.perPage})
      console.log(data)
      this.isLoading = false

      if(data.error){
        this.textDanger = data.error
      }else{
        this.collections = data.items
        this.totalItems = data.paginationInfo.count
      }
    }
  },
  async mounted() {
    this.getCollections(this.curPage)
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
</style>