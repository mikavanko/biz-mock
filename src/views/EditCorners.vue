<template>
    <div class="page foodhall-page">
        
        <div class="row">
            <div class="col-lg-7">
              <h1 v-if="$route.params.id">Изменить арендатора</h1>
              <h1 v-else>Создать арендатора</h1>

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
                      <b-form-select v-model="cornersData.status" :state="cornersDataValidation.status" :options="statusesSelect"></b-form-select>
                    </div>
                  </div>
                </div>
                <div class="edit-row">
                  <div class="edit-label">
                    Фуд-холл
                  </div>
                  <div class="edit-input-wrapper">
                    <div class="input-wrapper">
                      <b-form-select v-model="cornersData.foodhallid" :state="cornersDataValidation.foodhallid" :options="foodhallsSelect"></b-form-select>
                    </div>
                  </div>
                </div>
                <div class="edit-row">
                    <div class="edit-label">
                        Название
                    </div>
                    <div class="edit-input-wrapper">
                        <div class="input-wrapper">
                          <b-form-input v-model="cornersData.name" :state="cornersDataValidation.name" placeholder="Название"></b-form-input>
                        </div>
                    </div>
                </div>
                <div class="edit-row">
                  <div class="edit-label">
                    Концепт
                  </div>
                  <div class="edit-input-wrapper">
                    <div class="input-wrapper">
                      <b-form-input v-model="cornersData.concept" :state="cornersDataValidation.concept" placeholder="Концепт"></b-form-input>
                    </div>
                  </div>
                </div>
                <div class="edit-row">
                  <div class="edit-label">
                    Описание
                  </div>
                  <div class="edit-input-wrapper">
                    <div class="input-wrapper">
                      <b-form-textarea v-model="cornersData.description" :state="cornersDataValidation.description" placeholder="Описание" rows="6"></b-form-textarea>
                    </div>
                  </div>
                </div>
                <div class="edit-row">
                  <div class="edit-label">
                    Логотип
                  </div>
                  <div class="edit-input-wrapper">
                    <div class="image-wrapper">
                      <div class="image" @click="addNewLogo">
                        <img ref="logoImg" :src="imgUrl" alt="logo" v-if="imgUrl">
                        <b-icon font-scale="5" icon="image-alt" v-else></b-icon>
                      </div>
                      <div class="image-actions">
                        <div class="image-action" @click="removeLogo">
                          <b-icon font-scale="1" icon="x"></b-icon>
                          Удалить логотип
                        </div>
                        <div class="image-action" @click="addNewLogo">
                          <b-icon font-scale="1" icon="plus"></b-icon>
                          Добавить новый логотип
                        </div>
                      </div>
                      <!-- <b-form-invalid-feedback  :state="cornersDataValidation.point">
                        Загрузите фото
                      </b-form-invalid-feedback>
                      <b-form-valid-feedback :state="cornersDataValidation.point">
                        Фото загружено
                      </b-form-valid-feedback> -->
                    </div>
                    <b-form-file
                        v-model="file"
                        placeholder="Выберите логотип"
                        drop-placeholder="Перетащите логотип сюда..."
                        accept=".jpg, .png, .gif"
                        browse-text="Обзор"
                        ref="formFile"
                    ></b-form-file>
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
            <div class="col-lg-5">

            </div>
        </div>

      <b-modal v-model="isModalShown" id="modal-sm" size="sm" ok-only >{{modalText}}</b-modal>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'Edit',
  data(){
    return {
      file: null,
      imgUrl: null,
      imgIdToDelete: null,
      isLoading: this.$route.params.id ? true : false,
      isLoadingBtn: false,
      isModalShown: false,
      modalText: '',
      cornersData: {
        concept: null,
        description: null,
        foodhallid: null,
        name: null,
        status: null
      },
      cornersDataValidation: {
        concept: null,
        description: null,
        foodhallid: null,
        name: null,
        status: null,
      }
    }
  },
  mounted(){
    if(this.$route.params.id){
      this.$store.dispatch('GET_CORNERS_BY_ID', this.$route.params.id)
    }
    this.$store.dispatch('GET_CORNERS_STATUSES')
    if(!this.$store.getters.FOODHALLS.length) {
      this.$store.dispatch('GET_FOODHALLS')
    }
    this.$store.dispatch('GET_CORNERS_IMAGES', this.$route.params.id)
  },
  computed:{
    ...mapGetters(['CORNER_BY_ID','CORNER_STATUSES', 'FOODHALLS', 'CORNERS_IMAGES']),
    statusesSelect(){
      const statusesText = ['Новый','Работает','Закрыт']

      let corrnerStatusesArr = this.CORNER_STATUSES.map((cur, idx) => {
        return {
          value: cur,
          text: statusesText[idx]
        }
      })

      corrnerStatusesArr.unshift({
        value: null,
        text: 'Выберите статус'
      })

      return corrnerStatusesArr
    },
    foodhallsSelect(){
      let foodHallsArr = this.FOODHALLS.map(item => ({
        text: item.name,
        value: item.id
      }))

      foodHallsArr.unshift({
        value: null,
        text: 'Выберите фуд-холл'
      })

      return foodHallsArr
    }
  },
  watch: {
    file(val){
      this.imgUrl = val ? URL.createObjectURL(val) : null;
    },
    CORNER_BY_ID(newF){
      this.cornersData = this.CORNER_BY_ID

      this.isLoading = newF !== null ? false : this.isLoading
    },
    async CORNERS_IMAGES(val){
      if(val.length){
        this.imgIdToDelete = val[0].id

        let blob = await fetch(val[0].url).then(r => r.blob());
        this.file = new File([blob], val[0].name)
      }
    }
  },
  methods:{
    validate(){
      let isValid = true

      for(let key in this.cornersData){
        if(this.cornersData[key] === null ||
            this.cornersData[key] === ''
        ){
          this.cornersDataValidation[key] = false
          if(isValid) isValid = false
        }else{
          this.cornersDataValidation[key] =  null
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

        let imgData = null
        if(this.file){
          imgData = new FormData()
          imgData.append('file', this.file)
        }

        const operation = this.$route.params.id ? 'EDIT_CORNERS' : 'CREATE_CORNER'
        const data = await this.$store.dispatch(operation, [this.cornersData, imgData, this.imgIdToDelete])
        console.log(data)
        this.isLoadingBtn = false
        // const cornerRespStatus = this.$store.getters.CORNER_RESP_STATUS

        this.isModalShown = true

        // if(cornerRespStatus === 200){
        //   this.$store.dispatch('GET_CORNERS_IMAGES', this.$route.params.id)
        //   this.modalText = 'Данные успешно изменены'
        // }else{
        //   this.modalText = 'Произошла ошибка'
        // }

        if(data.error){
            this.modalText = data.error
        }else{
          if(this.$route.params.id){
            this.$store.dispatch('GET_CORNERS_IMAGES', this.$route.params.id)
            this.modalText = 'Данные успешно изменены'
          }else{
            this.modalText = 'Арендатор успешно создан'
            this.$store.dispatch('SET_CORNERS_BY_ID', data[0].data)
            this.$router.push({name: 'editCorners', params: {id: data[0].data.id}})
          }
        }
      }

      setTimeout(() => {
        this.isModalShown = false
        this.modalText = ''
      }, 3000)
    },
    removeLogo(){
      this.file = null
      this.imgUrl = null
    },
    addNewLogo(){
      this.$refs.formFile.$refs.input.click()

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
.image{
  width: 250px;
  height: 250px;
  border: 1px solid #C4C4C4;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;

  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &-wrapper{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 10px;
  }

  &-action{
    font-size: 14px;
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
  }
}
</style>