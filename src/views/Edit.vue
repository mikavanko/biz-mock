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
                <div class="edit-row">
                    <div class="edit-label">
                        Статус
                    </div>
                    <div class="edit-input-wrapper">
                        <div class="input-wrapper">
                          <b-form-select v-model="foodHallData.status" :state="foodHallDataValidation.status" :options="statusesSelect"></b-form-select>
                        </div>
                    </div>
                </div>
                <div class="edit-row">
                    <div class="edit-label">
                        Название
                    </div>
                    <div class="edit-input-wrapper">
                        <div class="input-wrapper">
                          <b-form-input v-model="foodHallData.name" :state="foodHallDataValidation.name" placeholder="Название"></b-form-input>
                        </div>
                    </div>
                </div>
                <div class="edit-row">
                    <div class="edit-label">
                        Город
                    </div>
                    <div class="edit-input-wrapper">
                        <div class="input-wrapper">
                          <b-form-input v-model="foodHallData.city" :state="foodHallDataValidation.city" placeholder="Город"></b-form-input>
                        </div>
                    </div>
                </div>
                <div class="edit-row">
                  <div class="edit-label">
                    Адрес
                  </div>
                  <div class="edit-input-wrapper">
                    <div class="input-wrapper">
                      <b-form-input v-model="foodHallData.address" :state="foodHallDataValidation.address" placeholder="Адрес"></b-form-input>
                    </div>
                  </div>
                </div>
                <div class="edit-row">
                  <div class="edit-label">
                    Описание
                  </div>
                  <div class="edit-input-wrapper">
                    <div class="input-wrapper">
                      <b-form-textarea v-model="foodHallData.description" :state="foodHallDataValidation.description" placeholder="Описание" rows="6"></b-form-textarea>
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
                    <b-button @click="submit">
                      <b-spinner small type="grow" v-if="isLoadingBtn"></b-spinner>
                      Сохранить
                    </b-button>
                  </div>
                </div>

              </div>
            </div>
            <div class="col-lg-3">

            </div>
        </div>

      <b-modal v-model="isModalShown" id="modal-sm" size="sm" ok-only >{{modalText}}</b-modal>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Map from '@/components/Map';

export default {
  name: 'Edit',
  data(){
    return {
      isLoading: this.$route.params.id ? true : false,
      isLoadingBtn: false,
      isModalShown: false,
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
    }
  },
  components: {
    Map,
  },
  mounted(){
    if(this.$route.params.id){
      this.$store.dispatch('GET_FOODHALLS_BY_ID', this.$route.params.id)
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
    validate(){
      let isValid = true

      for(let key in this.foodHallData){
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
    async submit(){
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