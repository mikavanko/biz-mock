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
                    Рейтинг
                  </div>
                  <div class="edit-input-wrapper">
                    <div class="input-wrapper">
                      <b-form-input type="number" v-model.number="cornersData.rate" :state="cornersDataValidation.rate" placeholder="Рейтинг"></b-form-input>
                    </div>
                  </div>
                </div>
                <div class="edit-row">
                  <div class="edit-label">
                    Кол-во отзывов
                  </div>
                  <div class="edit-input-wrapper">
                    <div class="input-wrapper">
                      <b-form-input type="number" v-model.number="cornersData.reviewcount" :state="cornersDataValidation.reviewcount" placeholder="Кол-во отзывов"></b-form-input>
                    </div>
                  </div>
                </div>
                <div class="edit-row">
                  <div class="edit-label">
                    Ср. чек
                  </div>
                  <div class="edit-input-wrapper">
                    <div class="input-wrapper">
                      <b-form-input type="number" v-model.number="cornersData.averagecheque" :state="cornersDataValidation.averagecheque" placeholder="Ср. чек"></b-form-input>
                    </div>
                  </div>
                </div>
                <b-row class="mb-3">
                  <b-col>
                    <div class="edit-label">
                      Логотип
                    </div>
                  </b-col>
                  <b-col>
                    <div class="image-action text-right" @click="addNewLogo">
                      <b-icon font-scale="1" icon="plus"></b-icon>
                      Добавить новую картинку
                      <b-spinner small type="grow" v-if="isLoadingLogo"></b-spinner>
                    </div>
                    <b-form-file
                        v-model="fileLogo"
                        placeholder="Выберите логотип"
                        drop-placeholder="Перетащите логотип сюда..."
                        accept=".jpg, .png, .gif"
                        browse-text="Обзор"
                        ref="formFileLogo"
                        class="invisible position-absolute"
                    ></b-form-file>
                  </b-col>
                </b-row>
                <b-row class="mb-3">
                  <b-col class="pc-img-wrapper">
                    <div class="pc-img" v-for="(item,idx) in cornerLogos" :key="idx">
                      <img ref="logoImg" :src="item.url" alt="img">
                      <b-button pill size="sm" variant="danger" class="pc-btn-close p-0 rounded-circle" @click="removeImg(item)">
                        <b-spinner small type="grow" v-if="idxClicked === item.id"></b-spinner>
                        <b-icon font-scale="1" icon="x" v-else></b-icon>
                      </b-button>
                    </div>
                  </b-col>
                </b-row>
                <b-row class="mb-3">
                  <b-col>
                    <div class="edit-label">
                      Фото
                    </div>
                  </b-col>
                  <b-col>
                    <div class="image-action text-right" @click="addNewPhoto">
                      <b-icon font-scale="1" icon="plus"></b-icon>
                      Добавить новую картинку
                      <b-spinner small type="grow" v-if="isLoadingPhoto"></b-spinner>
                    </div>
                    <b-form-file
                        v-model="filePhoto"
                        placeholder="Выберите фото"
                        drop-placeholder="Перетащите фото сюда..."
                        accept=".jpg, .png, .gif"
                        browse-text="Обзор"
                        ref="formFilePhoto"
                        class="invisible position-absolute"
                    ></b-form-file>
                  </b-col>
                </b-row>
                <b-row class="mb-3">
                  <b-col class="pc-img-wrapper">
                    <div class="pc-img" v-for="(item,idx) in cornerPhotos" :key="idx">
                      <img ref="logoImg" :src="item.url" alt="img">
                      <b-button pill size="sm" variant="danger" class="pc-btn-close p-0 rounded-circle" @click="removeImg(item)">
                        <b-spinner small type="grow" v-if="idxClicked === item.id"></b-spinner>
                        <b-icon font-scale="1" icon="x" v-else></b-icon>
                      </b-button>
                    </div>
                  </b-col>
                </b-row>
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
// import CornerService from "@/services/cornerService";
// const service = new CornerService()

export default {
  name: 'Edit',
  data(){
    return {
      fileLogo: null,
      filePhoto: null,
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
        status: null,
        rate: null,
        reviewcount: null,
        averagecheque: null
      },
      cornersDataValidation: {
        concept: null,
        description: null,
        foodhallid: null,
        name: null,
        status: null,
        rate: null,
        reviewcount: null,
        averagecheque: null
      },
      idxClicked: null,
      isLoadingLogo: false,
      isLoadingPhoto: false,
    }
  },
  mounted(){
    if(this.$route.params.id){
      this.$store.dispatch('GET_CORNERS_BY_ID', this.$route.params.id)
      this.getCornerImages()
    }
    this.$store.dispatch('GET_CORNERS_STATUSES')
    if(!this.$store.getters.FOODHALLS.length) {
      this.$store.dispatch('GET_FOODHALLS')
    }
  },
  computed:{
    ...mapGetters(['CORNER_BY_ID','CORNER_STATUSES', 'FOODHALLS', 'CORNERS_IMAGES']),
    cornerLogos(){
      return this.CORNERS_IMAGES.filter((t)=>{return t.resourceType === 'Logo'})
    },
    cornerPhotos(){
      return this.CORNERS_IMAGES.filter((t)=>{return t.resourceType === 'Photo'})
    },
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
    fileLogo(val){
      this.uploadImage(val, 'Logo')
    },
    filePhoto(val){
      this.uploadImage(val, 'Photo')
    },
    CORNER_BY_ID(newF){
      this.cornersData = this.CORNER_BY_ID

      this.isLoading = newF !== null ? false : this.isLoading
    },
  },
  methods:{
    addNewLogo(){
      this.$refs.formFileLogo.$refs.input.click()
    },
    addNewPhoto(){
      this.$refs.formFilePhoto.$refs.input.click()
    },
    rmImgFromStateById(id){
      const idx = this.images.findIndex(item=>item.id === id)
      this.images.splice(idx, 1)
    },
    async removeImg(item){
      this.idxClicked = item.id

      const cornerId = this.cornersData.id
      const imgIdToDelete = item.id
      const data = await this.$store.dispatch('REMOVE_CORNER_IMAGE', {cornerId,imgIdToDelete})

      this.idxClicked = null

      this.isModalShown = true

      if(data !== '' && data.error){
        this.modalText = data.error
      }else{
        this.modalText = 'Изображение успешно удалено'
      }
    },
    async uploadImage(file,type){
      let formData = null

      if(file){
        formData = new FormData()
        formData.append('ImageTypes', type)
        formData.append('Files', file)

        this[type === 'Logo' ? 'isLoadingLogo' : 'isLoadingPhoto'] = true

        const cornerId = this.cornersData.id
        const data = await this.$store.dispatch('ADD_CORNER_IMAGE', {cornerId, formData, file})

        this[type === 'Logo' ? 'isLoadingLogo' : 'isLoadingPhoto'] = false


        if (data.error) {
          this.modalText = data.error
        } else {
          await this.getCornerImages()
          this.isModalShown = true
          this.modalText = 'Изображение успешно добавлено'

        }
      }
    },
    validate(){
      let isValid = true

      console.log('fuck')
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
      // const isValid = this.validate()

      // if(!isValid){
      //   this.isModalShown = true
      //   this.modalText = 'Заполните все поля'
      // }else{
        this.isLoadingBtn = true


        const operation = this.$route.params.id ? 'EDIT_CORNERS' : 'CREATE_CORNER'
        const data = await this.$store.dispatch(operation, this.cornersData)

        this.isLoadingBtn = false

        this.isModalShown = true

        if(data.error){
            this.modalText = data.error
        }else{
          if(this.$route.params.id){
            this.modalText = 'Данные успешно изменены'
          }else{
            this.modalText = 'Арендатор успешно создан'
            this.$store.dispatch('SET_CORNERS_BY_ID', data[0].data)
            this.$router.push({name: 'editCorners', params: {id: data[0].data.id}})
          }
        }
      // }

      setTimeout(() => {
        this.isModalShown = false
        this.modalText = ''
      }, 3000)
    },

    async getCornerImages(){
        const data = await this.$store.dispatch('GET_CORNERS_IMAGES', this.$route.params.id)

        if (data.error) {
          this.isModalShown = true
          this.modalText = data.error
        }
    },
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

.pc{
  &-title{
    font-weight: bold;
  }
  &-name{
    font-weight: 500;
  }
  &-row{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-card{
    width: 200px;
    display: inline-block;
    vertical-align: top;
  }
  &-img{
    width: 100px;
    height: 100px;
    position: relative;
    display: inline-block;
    margin: 0 10px 10px 0;

    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &-btn-close{
    position: absolute;
    top: -5px;
    right: -5px;
  }
}
.image-action{
  cursor: pointer;
}
</style>