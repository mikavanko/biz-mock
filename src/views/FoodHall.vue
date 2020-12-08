<template>
  <div class="page foodhall-page">
    <div class="row">
      <div class="col-lg-9">
        <h1>Выберите фуд-холл для изменения</h1>
        <div class="input-wrapper">
          <input type="text" class="input" v-model="foodHallsSearch" placeholder="Поиск">
        </div>
        <div class="input-wrapper">
          <span class="input-pre">Действие</span>
          <input type="text" class="input">
          <button type="submit" class="input-submit">Выполнить</button>
          <span class="input-status">Выбрано 0 объектов из 3</span>
        </div>

        <div class="text-center" v-if="isLoading">
          <b-spinner variant="secondary" label="Text Centered"></b-spinner>
        </div>
        <p class="text-danger" v-else-if="!filterFoodHalls.length">Ни одного фуд-холла не найдено</p>
        <b-table
            v-else
            thead-class="bg-light"
            small
            hover
            :items="filterFoodHalls"
            :fields="tableFields"
            sort-compare-locale="en">

          <template v-slot:cell(checkbox)="item">
            <input type="checkbox" @click="check(item)">
          </template>
          <template v-slot:cell(actions)="item">
            <router-link :to="{ name:'edit', params: { id: item.item.id }}"><b-icon icon="pencil"></b-icon></router-link>
          </template>
        </b-table>
      </div>
      <div class="col-lg-3">
        <router-link :to="{ name:'createFoodHall'}" class="input-submit">Добавить фуд-холл</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'FoodHall',
  data(){
    return{
      isLoading: true,
      foodHallsSearch: '',
      tableFields: [
        {
          key: 'checkbox',
          label: '',
          sortable: false
        },
        {
          key: 'name',
          label: 'Название',
          sortable: true
        },
        {
          key: 'city',
          label: 'Город',
          sortable: true
        },
        {
          key: 'address',
          label: 'Адрес',
          sortable: true
        },
        {
          key: 'status',
          label: 'Статус',
          sortable: true
        },
        {
          key: 'actions',
          label: '',
          sortable: false
        }
      ],
    }
  },
  mounted(){
    this.$store.dispatch('GET_FOODHALLS')
  },
  computed:{
    ...mapGetters(['FOODHALLS']),
    foodHallsPrep(){
      return this.FOODHALLS.map(cur => ({...cur, status: cur.status === 'Active' ? 'Работает' : cur.status === 'Building' ? 'Строится' : 'Закрыт' }))
    },
    filterFoodHalls(){
      if(this.foodHallsSearch.length){
        return this.foodHallsPrep.filter(cur => {
          let find = Object.values(cur).filter(el => {
            if(typeof el === 'string' && el.toLowerCase().indexOf(this.foodHallsSearch.toLowerCase()) !== -1){
              return el
            }
          })
          if(find.length){
            return cur
          }
        })
      }else{
        return this.foodHallsPrep
      }
    }
  },
  watch: {
    FOODHALLS(newF){
      this.isLoading = newF.length > 0 ? false : this.isLoading
    }
  },
  methods: {
    check(item){
      console.log(item)
    }
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
.corner-table{
    width: 100%;

    thead{
        background: #EEEEEE;
    }
    td,th{
        text-align: left;

        &:first-child{
            padding: 0 20px;
            width: 26px;
        }
    }
}
.foodhall-page{
    .input{
        width: 340px;
        height: 40px;
        border: 1px solid #C4C4C4;
        border-radius: 12px;
        margin-right: 20px;
        padding: 0 10px;
        margin-bottom: 0;

        &-wrapper{
            margin-bottom: 13px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }

        &-submit{
            background: #C4C4C4;
            border-radius: 12px;
            font-size: 14px;
            height: 40px;
            border: none;
            padding: 0 20px;
            color: #000;
            display: inline-block;
            text-decoration: none;
            line-height: 40px;
        }

        &-pre{
            margin-right: 10px;
        }
        &-status{
            margin-left: 20px;
            color: #C4C4C4;
        }
    }
}
</style>