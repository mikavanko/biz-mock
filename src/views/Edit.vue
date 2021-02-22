<template>
    <div class="page foodhall-page">
        
        <div class="row">
            <div class="col-lg-6">
              <h1 v-if="$route.params.id">Изменить фуд-холл</h1>
              <h1 v-else>Создать фуд-холл</h1>

              <div class="text-center" v-if="isLoading">
                <b-spinner variant="secondary" label="Text Centered"></b-spinner>
              </div>

              <div class="edit" v-else>
                <b-form @submit="submit">
                  <div class="edit-row">
                      <div class="edit-label">
                          Статус
                      </div>
                      <div class="edit-input-wrapper">
                          <div class="input-wrapper">
                            <b-form-select required v-model="foodHallData.status" :state="foodHallDataValidation.status" :options="statusesSelect"></b-form-select>
                          </div>
                      </div>
                  </div>
                  <div class="edit-row">
                      <div class="edit-label">
                          Название
                      </div>
                      <div class="edit-input-wrapper">
                          <div class="input-wrapper">
                            <b-form-input required v-model="foodHallData.name" :state="foodHallDataValidation.name" placeholder="Название"></b-form-input>
                          </div>
                      </div>
                  </div>
                  <div class="edit-row">
                      <div class="edit-label">
                          Город
                      </div>
                      <div class="edit-input-wrapper">
                          <div class="input-wrapper">
                            <b-form-input required v-model="foodHallData.city" :state="foodHallDataValidation.city" placeholder="Город"></b-form-input>
                          </div>
                      </div>
                  </div>
                  <div class="edit-row">
                    <div class="edit-label">
                      Адрес
                    </div>
                    <div class="edit-input-wrapper">
                      <div class="input-wrapper">
                        <b-form-input required v-model="foodHallData.address" :state="foodHallDataValidation.address" placeholder="Адрес"></b-form-input>
                      </div>
                    </div>
                  </div>
                  <div class="edit-row">
                    <div class="edit-label">
                      E-mail менеджера
                    </div>
                    <div class="edit-input-wrapper">
                      <div class="input-wrapper">
                        <b-form-input pattern="^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$" type="text" v-model="foodHallData.manageremail" :state="foodHallDataValidation.manageremail" placeholder="E-mail"></b-form-input>
                      </div>
                    </div>
                  </div>
                  <div class="edit-row">
                    <div class="edit-label">
                      К столу
                    </div>
                    <div class="edit-input-wrapper">
                      <div class="input-wrapper">
                        <b-form-input type="email" v-model="foodHallData.tableservingmanageremail" :state="foodHallDataValidation.tableservingmanageremail" placeholder="К столу"></b-form-input>
                      </div>
                    </div>
                  </div>
                  <div class="edit-row">
                    <div class="edit-label">
                      Описание
                    </div>
                    <div class="edit-input-wrapper">
                      <div class="input-wrapper">
                        <b-form-textarea required v-model="foodHallData.description" :state="foodHallDataValidation.description" placeholder="Описание" rows="6"></b-form-textarea>
                      </div>
                    </div>
                  </div>
                  <div class="edit-row">
                    <div class="edit-label">
                      Время приема
                    </div>
                    <div class="edit-input-wrapper">
                      <div class="input-wrapper">
                        с <b-form-timepicker v-bind="timepickerLabels['ru']" v-model="foodHallData.workdaystart" :state="foodHallDataValidation.workdaystart" no-close-button size="sm" local="en" placeholder="Выберите время" class="ml-3 mr-3"></b-form-timepicker>
                        до <b-form-timepicker v-bind="timepickerLabels['ru']" v-model="foodHallData.workdayend" :state="foodHallDataValidation.workdayend" no-close-button size="sm" local="en" placeholder="Выберите время" class="ml-3"></b-form-timepicker>
                      </div>
                    </div>
                  </div>
                  <div class="edit-row">
                    <div class="edit-label">
                      Доставка
                    </div>
                    <div class="edit-input-wrapper">
                      <div class="input-wrapper">
                        <b-form-group class="mb-0">
                          <b-form-radio-group
                              v-model="foodHallData.deliveryenabled"
                              :state="foodHallDataValidation.deliveryenabled"
                          >
                            <b-form-radio :value="true">Да</b-form-radio>
                            <b-form-radio :value="false">Нет</b-form-radio>
                          </b-form-radio-group>
                        </b-form-group>
                      </div>
                    </div>
                  </div>
                  <div class="edit-row">
                    <div class="edit-label">
                      Самовывоз
                    </div>
                    <div class="edit-input-wrapper">
                      <div class="input-wrapper">
                        <b-form-group class="mb-0">
                          <b-form-radio-group
                              v-model="foodHallData.pickupenabled"
                              :state="foodHallDataValidation.pickupenabled"
                          >
                            <b-form-radio :value="true">Да</b-form-radio>
                            <b-form-radio :value="false">Нет</b-form-radio>
                          </b-form-radio-group>
                        </b-form-group>
                      </div>
                    </div>
                  </div>
                  <div class="edit-row">
                    <div class="edit-label">
                      Зона доставки
                    </div>
                    <div class="edit-input-wrapper">
                      <Map v-bind.sync="geometry" />
                      <b-form-invalid-feedback  :state="foodHallDataValidation.point">
                        Укажите координаты фуд-холла
                      </b-form-invalid-feedback>
                      <b-form-valid-feedback :state="foodHallDataValidation.point">
                        Координаты фуд-холла успешно добавлены
                      </b-form-valid-feedback>
                      <b-form-invalid-feedback  :state="foodHallDataValidation.deliveryzone">
                        Укажите зону доставки фуд-холла
                      </b-form-invalid-feedback>
                      <b-form-valid-feedback :state="foodHallDataValidation.deliveryzone">
                        Зона доставки фуд-холла успешно добавлена
                      </b-form-valid-feedback>
                    </div>
                  </div>
                  <div class="submit-row">
                    <div class="text-right">
                      <b-button type="submit">
                        <b-spinner small type="grow" v-if="isLoadingBtn"></b-spinner>
                        Сохранить
                      </b-button>
                    </div>
                  </div>
                </b-form>
              </div>
            </div>
            <div class="col-lg-3" v-if="$route.params.id">
              <p>ID кассы:
                <span v-if="cashBoxId !== null">{{cashBoxId}}</span>
                <span v-else>{{cashBoxText}}</span>
              </p>
              <b-button @click="launchMenuLoad($route.params.id)" :disabled="isLaunchMenuLoading || cashBoxId === null">Загрузить блюда</b-button>
            </div>
        </div>

      <b-modal v-model="isModalShown" id="modal-sm" size="sm" ok-only >{{modalText}}</b-modal>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Map from '@/components/Map';
import productsService from "@/services/productsService";
const service = new productsService

export default {
  name: 'Edit',
  data(){
    return {
      isLoading: this.$route.params.id ? true : false,
      isLoadingBtn: false,
      isModalShown: false,
      isLaunchMenuLoading: false,
      modalText: '',
      geometry: {
        point: null,
        deliveryzone: null
      },
      timepickerLabels:{
        ru:{
          labelHours: 'Часы',
          labelMinutes: 'Минуты',
          labelSeconds: 'Секунды',
          labelIncrement: 'Увеличить',
          labelDecrement: 'Уменьшить',
          labelSelected: 'Выбранное время',
          labelNoTimeSelected: 'Время не выбрано',
          labelCloseButton: 'Закрыть'
        }
      },
      foodHallData: {
        status: null,
        address: null,
        city: null,
        deliveryenabled: null,
        deliveryzone: null,
        description: null,
        name: null,
        pickupenabled: null,
        point: null,
        workdayend: null,
        workdaystart: null,
        manageremail: null,
        tableservingmanageremail: null,
      },
      foodHallDataValidation: {
        status: null,
        address: null,
        city: null,
        deliveryenabled: null,
        deliveryzone: null,
        description: null,
        name: null,
        pickupenabled: null,
        point: null,
        workdayend: null,
        workdaystart: null,
      },
      cashBoxId: null,
      cashBoxText: '',
    }
  },
  components: {
    Map,
  },
  mounted(){
    if(this.$route.params.id){
      this.$store.dispatch('GET_FOODHALLS_BY_ID', this.$route.params.id)

      this.getCashboxIdByFoodHallId(this.$route.params.id)
    }
    this.$store.dispatch('GET_STATUSES')
  },
  computed:{
    ...mapGetters(['FOODHALL_BY_ID','STATUSES']),
    statusesSelect(){
      const statusesText = ['Строится','Работает','Закрыт']

      let foodHallStatusesArr = this.STATUSES.map((cur, idx) => {
        return {
          value: cur,
          text: statusesText[idx]
        }
      })

      foodHallStatusesArr.unshift({
        value: null,
        text: 'Выберите статус'
      })

      return foodHallStatusesArr
    }
  },
  watch: {
    FOODHALL_BY_ID(newF){
      this.foodHallData = this.FOODHALL_BY_ID

      this.isLoading = newF !== null ? false : this.isLoading

      this.geometry.point = this.foodHallData.point
      this.geometry.deliveryzone = this.foodHallData.deliveryzone
    },
    geometry:{
      deep: true,
      handler(value){
        if(value.deliveryzone){
          this.foodHallData.deliveryzone = value.deliveryzone
        }
        if(value.point){
          this.foodHallData.point = value.point
        }
      }
    }
  },
  methods:{
    async getCashboxIdByFoodHallId(id){
      const data = await service.getCashboxIdByFoodHallId({id})

      if(data.error){
        if(data.error.response.status === 404){
          this.cashBoxText = 'Не найден'
        }else{
          this.cashBoxText = data.error
        }
      }else{
        this.cashBoxId = data.cashboxId
      }
    },
    async launchMenuLoad(id){
      const menuLoad = {
        "cashBoxId": this.cashBoxId,
        "cashboxTypeId": "Iiko",
        "foodhallId": parseInt(id)
      }

      this.isLaunchMenuLoading = true
      const data = await service.launchMenuLoad({menuLoad})
      this.isLaunchMenuLoading = false

      this.isModalShown = true
      if(data.error){
        this.modalText = data.error
      }else{
        this.modalText = 'Загрузка меню запущена'
      }

      setTimeout(() => {
        this.isModalShown = false
        this.modalText = ''
      }, 3000)
    },
    validate(){
      let isValid = true

      for(let key in this.foodHallData){
        if(this.foodHallDataValidation[key] === undefined) continue
        if(this.foodHallData[key] === null ||
            this.foodHallData[key] === ''
        ){
          this.foodHallDataValidation[key] = false
          if(isValid) isValid = false
        }else{
          this.foodHallDataValidation[key] =  null
        }
      }
      return isValid
    },
    async submit(e){
      e.preventDefault()
      
      const isValid = this.validate()

      if(!isValid){
        this.isModalShown = true
        this.modalText = 'Заполните все поля'
      }else{
        this.isLoadingBtn = true

        const operation = this.$route.params.id ? 'EDIT_FOODHALLS' : 'CREATE_FOODHALL'
        const data = await this.$store.dispatch(operation, this.foodHallData)

        this.isLoadingBtn = false
        this.isModalShown = true

        if(data.error){
            this.modalText = data.error
        }else{
          if(this.$route.params.id){
            this.modalText = 'Данные успешно изменены'
          }else{
            this.modalText = 'Фуд-холл успешно создан'
            this.$store.dispatch('SET_FOODHALLS_BY_ID', data)
            this.$router.push({name: 'edit', params: {id: data.Id}})
          }
        }
      }

      setTimeout(() => {
        this.isModalShown = false
        this.modalText = ''
      }, 3000)
    }
  },
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
.edit{
    &-row{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 13px;
    }
    &-label{
        font-weight: bold;
        width: 170px;
        min-width: 170px;
    }
  &-input{
    &-wrapper{
      width: 100%;
    }
  }
}

.input{
    width: 340px;
    height: 40px;
    border: 1px solid #C4C4C4;
    border-radius: 12px;
    margin-right: 20px;
    padding: 0 10px;
    margin-bottom: 0;

    &-wrapper{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
}
</style>