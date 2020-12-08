<template>
  <div class="page foodhall-page">

    <b-row>
      <b-col md="6">
        <h1 v-if="$route.params.id">Изменить категорию</h1>
        <h1 v-else>Создать категорию</h1>

        <div class="text-center" v-if="isLoading">
          <b-spinner variant="secondary" label="Text Centered"></b-spinner>
        </div>

        <div class="edit" v-else>
          <div class="edit-row">
            <div class="edit-label">
              Название
            </div>
            <div class="edit-input-wrapper">
              <div class="input-wrapper">
                <b-form-input v-model="categoriesData.name" :state="categoriesDataValidation.name" placeholder="Название"></b-form-input>
              </div>
            </div>
          </div>
          <div class="edit-row">
            <div class="edit-label">
              Описание
            </div>
            <div class="edit-input-wrapper">
              <div class="input-wrapper">
                <b-form-textarea rows="3" max-rows="6" v-model="categoriesData.description" :state="categoriesDataValidation.description" placeholder="Описание"></b-form-textarea>
              </div>
            </div>
          </div>
          <div class="edit-row">
            <div class="edit-label">
              Приоритет
            </div>
            <div class="edit-input-wrapper">
              <div class="input-wrapper">
                <b-form-input type="number" v-model="categoriesData.showPriority" :state="categoriesDataValidation.showPriority" placeholder="Приоритет"></b-form-input>
              </div>
            </div>
          </div>
          <template v-if="$route.params.id">
            <b-row class="mb-3">
              <b-col>
                <div class="edit-label">
                  Картинки
                </div>
              </b-col>
              <b-col class="text-right">
                <b-button size="sm" class="image-action text-center" @click="addNewImg">
                  <b-icon font-scale="1" icon="plus" v-if="!isLoadingImageSubmitBtn"></b-icon>
                  <b-spinner small type="grow" v-else></b-spinner>
                </b-button>
                <b-form-file
                    v-model="file"
                    placeholder="Выберите логотип"
                    drop-placeholder="Перетащите логотип сюда..."
                    accept=".jpg, .png, .gif"
                    browse-text="Обзор"
                    ref="formFile"
                    class="invisible position-absolute"
                ></b-form-file>
              </b-col>
            </b-row>
            <b-row class="mb-3">
              <b-col class="pc-img-wrapper">
                <div class="pc-img" v-for="(item,idx) in images" :key="idx">
                  <img ref="logoImg" :src="item.url" alt="img">
                  <b-button pill size="sm" variant="danger" class="pc-btn-close p-0 rounded-circle" @click="removeImg(item)">
                    <b-spinner small type="grow" v-if="idxClicked === item.id"></b-spinner>
                    <b-icon font-scale="1" icon="x" v-else></b-icon>
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </template>
          <div class="submit-row">
            <div class="text-right">
              <b-button @click="submit">
                <b-spinner small type="grow" v-if="isLoadingBtn"></b-spinner>
                Сохранить
              </b-button>
              <b-button variant="danger" @click="remove" class="ml-2" v-if="$route.params.id" :disabled="categoriesData.isDeleted">
                <b-spinner small type="grow" v-if="isRmLoadingBtn"></b-spinner>
                Удалить
              </b-button>
            </div>
          </div>

          <template v-if="$route.params.id">
            <h3 class="h3 mt-3 mb-3">Прикрепленные продукты</h3>
            <Table :getData="service.getCategoryProducts"
                   :queryParams="{key: 'categoryId', value: categoriesData.id}"
                   :table-fields="productTableFields"
                   :idToDelete="idToDelete"
                   :itemToAdd="itemToAdd"
            >
              <template v-slot="slotProps">
                <b-button size="sm"
                          variant="danger"
                          class="mr-1"
                          @click="deleteProductFromCategory(categoriesData.id,slotProps.item.id)">
                  <b-spinner small type="grow" v-if="idxClicked === slotProps.item.id"></b-spinner>
                  <b-icon v-else icon="x"></b-icon>
                </b-button>
              </template>
            </Table>

            <h3 class="h3 mt-3 mb-3">Продукты</h3>
            <Table :getData="service.getProducts"
                   :table-fields="productTableFields"
            >
              <template v-slot="slotProps">
                <b-button size="sm"
                          variant="success"
                          class="mr-1"
                          @click="setProductToCategory(categoriesData.id,slotProps.item)">
                  <b-spinner small type="grow" v-if="idxClicked === slotProps.item.id"></b-spinner>
                  <b-icon v-else icon="plus"></b-icon>
                </b-button>
              </template>
            </Table>
          </template>
        </div>
      </b-col>
    </b-row>

    <b-modal v-model="isModalShown" id="modal-sm" size="sm" ok-only >{{modalText}}</b-modal>
  </div>
</template>

<script>
import CategoryService from "@/services/categoryService"
const service = new CategoryService()
import Table from "@/components/Table";

export default {
  name: 'EditCategories',
  components:{
    Table
  },
  data(){
    return {
      isLoading: this.$route.params.id ? true : false,
      isLoadingBtn: false,
      isRmLoadingBtn: false,
      isModalShown: false,
      modalText: '',
      categoriesData: {
        name: null,
        description: null,
        showPriority: null,
        image: null
      },
      categoriesDataValidation: {
        name: null,
        description: null,
        showPriority: null,
      },
      isLoadingImageSubmitBtn: false,
      file: null,
      images: [],
      idxClicked: null,
      productTableFields: [
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
          key: 'actions',
          label: '',
          sortable: false
        },
      ],
      idToDelete: null,
      itemToAdd: null,
      service:service
    }
  },
  watch:{
    file(val){
      console.log(val)
      this.uploadImage(val)
    },
  },
  async mounted(){
    if(this.$route.params.id){
      const data = await service.getCategoryById(this.$route.params.id)
      this.isLoading = false

      if(data.error){
        this.textDanger = data.error
      }else{
        this.categoriesData = data
        
        if(data.image){
          this.setImages([{...data.image}])
        }
      }
    }
  },
  methods:{
    async setProductToCategory(categoryId, product){
      const productId = product.id

      this.idxClicked = product.id
      const data = await service.setProductToCategory({categoryId,productId})
      this.idxClicked = null

      if (data.error) {
        this.isModalShown = true
        this.modalText = data.error
      } else {
        this.itemToAdd = product
      }
    },
    async deleteProductFromCategory(categoryId, productId){
      this.idxClicked = productId
      const data = await service.deleteProductFromCategory({categoryId,productId})
      this.idxClicked = null

      if (data.error) {
        this.isModalShown = true
        this.modalText = data.error
      } else {
        this.idToDelete = productId
      }
    },
    addNewImg(){
      this.$refs.formFile.$refs.input.click()
    },
    rmImgFromStateById(id){
      const idx = this.images.findIndex(item=>item.id === id)
      this.images.splice(idx, 1)
    },
    async removeImg(item){
      this.idxClicked = item.id
      const data = await service.removeImage(this.categoriesData.id, item.id)
      this.idxClicked = null

      if (data.error) {
        this.isModalShown = true
        this.modalText = data.error
      } else {
        this.isModalShown = true
        this.modalText = 'Изображение успешно удалено'
        this.rmImgFromStateById(item.id)
      }
    },
    async getFileFromUrl(url){
      const blob = await fetch(url).then(r => r.blob())
      const name = url.substring(url.lastIndexOf('/')+1)
      return new File([blob], name)
    },
    async setImages(images){
      await Promise.all(images.map(async item => {
        const file = await this.getFileFromUrl(item.url)

        const imgObj = {
          url: file ? URL.createObjectURL(file) : null,
          id: item.id
        }
        this.$set(this.images, 0, imgObj)
      }))
    },
    async uploadImage(file){
      let imgData = null

      if(file){
        imgData = new FormData()
        imgData.append('Image', file)

        this.isLoadingImageSubmitBtn = true

        const data = await service.uploadImage(this.categoriesData.id, imgData)
        this.isLoadingImageSubmitBtn = false

        if (data.error) {
          this.isModalShown = true
          this.modalText = data.error
        } else {
          this.isModalShown = true
          this.modalText = 'Изображение успешно добавлено'
          this.setImages([{...data}])
        }
      }
    },
    async remove(){
      this.isRmLoadingBtn = true
      const data = await service.deleteCategory(this.$route.params.id)

      this.isRmLoadingBtn = false
      this.isModalShown = true

      if(data.error){
        this.modalText = data.error
      }else{
        this.categoriesData.isDeleted = true
        this.modalText = 'Категория успешно удалена'
      }
      console.log(data)

      setTimeout(() => {
        this.isModalShown = false
        this.modalText = ''
      }, 3000)
    },
    validate(){
      let isValid = true

      for(let key in this.categoriesData){
        if(key !== 'image' && this.categoriesData[key] === null ||
            this.categoriesData[key] === ''
        ){
          this.categoriesDataValidation[key] = false
          if(isValid) isValid = false
        }else{
          this.categoriesDataValidation[key] =  null
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

        let data, fm = new FormData()

        for(const key in this.categoriesData){
          fm.append(key, this.categoriesData[key])
        }
        if(this.$route.params.id){
          data = await service.setCategoryById(fm)
        }else{
          data = await service.createCategory(fm)
          this.categoriesData.id = data.id
        }

        this.isLoadingBtn = false
        this.isModalShown = true

        if(data.error){
          this.modalText = data.error
        }else{
          if(this.$route.params.id){
            this.modalText = 'Данные успешно изменены'
          }else{
            this.modalText = 'Категория успешно создана'
            this.$router.push({name: 'editCategories', params: {id: data.id}})
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
.h3{
  font-size: 20px;
}
</style>