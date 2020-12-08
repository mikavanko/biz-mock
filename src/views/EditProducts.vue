<template>
  <div class="page foodhall-page">
    <b-row>
      <b-col md="6">
        <h1 v-if="$route.params.id">Изменить продукт</h1>
        <h1 v-else>Создать продукт</h1>

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
                <b-form-input v-model="productData.name" readonly placeholder="Название"></b-form-input>
              </div>
            </div>
          </div>
          <div class="edit-row">
            <div class="edit-label">
              Описание
            </div>
            <div class="edit-input-wrapper">
              <div class="input-wrapper">
                <b-form-textarea rows="3" max-rows="6" v-model="productData.description" readonly placeholder="Описание"></b-form-textarea>
              </div>
            </div>
          </div>
          <div class="edit-row">
            <div class="edit-label">
              Корнер
            </div>
            <div class="edit-input-wrapper">
              <div class="input-wrapper">
                <b-form-input v-model="corner.name" readonly placeholder="Корнер"></b-form-input>
                <b-button :disabled="!corner.id" variant="danger" class="ml-3" @click="unbindCorner(corner.id)">
                  <b-spinner small type="grow" v-if="idxClicked === corner.id"></b-spinner>
                  <span v-else>Открепить</span>
                </b-button>
              </div>
            </div>
          </div>
          <div class="edit-row">
            <div class="edit-label">
              Статус
            </div>
            <div class="edit-input-wrapper">
              <div class="input-wrapper">
                <b-form-select v-model="productData.status" :options="statusesSelect" @change="setStatus"></b-form-select>
              </div>
            </div>
          </div>
          <b-row class="mb-3">
            <b-col>
              <div class="edit-label">
                Картинки
              </div>
            </b-col>
            <b-col>
              <div class="image-action text-right" @click="addNewImg">
                <b-icon font-scale="1" icon="plus"></b-icon>
                Добавить новую картинку
                <b-spinner small type="grow" v-if="isLoadingImageSubmitBtn"></b-spinner>
              </div>
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
          <b-row class="mb-3">
            <b-col md="8">
              <h3 class="h3">
                Время приготовления
              </h3>
            </b-col>
            <b-col md="3" offset="1">
              <b-form-input v-model.number="productDataToPost.cookingTime" type="number" placeholder="Время приготовления"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col md="8">
              <h3 class="h3">
                Доступен для доставки
              </h3>
            </b-col>
            <b-col md="4">
              <b-form-group class="mb-0 text-right">
                <b-form-radio-group
                    v-model="productDataToPost.arealInfo.availableForDelivery"
                >
                  <b-form-radio :value="true">Да</b-form-radio>
                  <b-form-radio :value="false">Нет</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col md="8">
              <h3 class="h3">
                Доступен для самовывоза
              </h3>
            </b-col>
            <b-col md="4">
              <b-form-group class="mb-0 text-right">
                <b-form-radio-group
                    v-model="productDataToPost.arealInfo.availableForPickup"
                >
                  <b-form-radio :value="true">Да</b-form-radio>
                  <b-form-radio :value="false">Нет</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col md="8">
              <h3 class="h3">
                Доступен для заказа к столу
              </h3>
            </b-col>
            <b-col md="4">
              <b-form-group class="mb-0 text-right">
                <b-form-radio-group
                    v-model="productDataToPost.arealInfo.availableForTableServing"
                >
                  <b-form-radio :value="true">Да</b-form-radio>
                  <b-form-radio :value="false">Нет</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col md="8">
              <h3 class="h3">
                Доступен в меню
              </h3>
            </b-col>
            <b-col md="4">
              <b-form-group class="mb-0 text-right">
                <b-form-radio-group
                    v-model="productDataToPost.arealInfo.availableForMenu"
                >
                  <b-form-radio :value="true">Да</b-form-radio>
                  <b-form-radio :value="false">Нет</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-right mb-3">
              <b-button variant="success" class="ml-3" @click="setProducts">
                Сохранить
              </b-button>
            </b-col>
          </b-row>
          <b-tabs>
            <b-tab title="Пищевая ценность" active>
              <b-row>
                <b-col md="6">
                  <p class="pc-title mt-3 mb-1">на 100 г.</p>
                  <div class="pc-row">
                    <span class="pc-name">Белки</span>
                    <span class="pc-value">{{productData.productParameters.proteinsAmount}}</span>
                  </div>
                  <div class="pc-row">
                    <span class="pc-name">Жиры</span>
                    <span class="pc-value">{{productData.productParameters.fatAmount}}</span>
                  </div>
                  <div class="pc-row">
                    <span class="pc-name">Углеводы</span>
                    <span class="pc-value">{{productData.productParameters.carbohydratesAmount}}</span>
                  </div>
                  <div class="pc-row">
                    <span class="pc-name">Энерг. ценн.</span>
                    <span class="pc-value">{{productData.productParameters.energyAmount}}</span>
                  </div>
                </b-col>
                <b-col md="6">
                  <p class="pc-title mt-3 mb-1">Всего</p>
                  <div class="pc-row">
                    <span class="pc-name">Белки</span>
                    <span class="pc-value">{{productData.productParameters.proteinsFullAmount}}</span>
                  </div>
                  <div class="pc-row">
                    <span class="pc-name">Жиры</span>
                    <span class="pc-value">{{productData.productParameters.fatFullAmount}}</span>
                  </div>
                  <div class="pc-row">
                    <span class="pc-name">Углеводы</span>
                    <span class="pc-value">{{productData.productParameters.carbohydratesFullAmount}}</span>
                  </div>
                  <div class="pc-row">
                    <span class="pc-name">Энерг. ценн.</span>
                    <span class="pc-value">{{productData.productParameters.energyFullAmount}}</span>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
                  <div class="pc-row">
                    <span class="pc-name">Вес</span>
                    <span class="pc-value">{{productData.productParameters.weight}}</span>
                  </div>
                </b-col>
              </b-row>
            </b-tab>
            <b-tab title="Цены">
              <b-card class="pc-card mt-3 mr-3" v-for="item in productData.price" :key="item.id" :title="item.name" :sub-title="item.value.toString()"></b-card>
            </b-tab>
            <b-tab title="Коллекции">
              <h4 class="mt-3">Прикрепленные</h4>
              <p class="text-danger" v-if="!productData.collections.length">Пусто</p>
              <b-card v-else
                      class="pc-card mt-3 mr-3"
                      v-for="item in productData.collections"
                      :key="item.id"
                      :title="item.name"
                      :sub-title="item.description">
                <b-card-text>
                  <div class="pc-row">
                    <span class="pc-name">Приоритет</span>
                    <span class="pc-value">{{item.showPriority}}</span>
                  </div>
                  <div class="pc-row">
                    <span class="pc-name">На главной</span>
                    <span class="pc-value">{{item.showInMainMenu ? 'Да':'Нет'}}</span>
                  </div>
                  <b-button variant="danger" class="mt-3" @click="unbindCollection(item.id)">
                    <b-spinner small type="grow" v-if="idxClicked === item.id"></b-spinner>
                    Открепить
                  </b-button>
                </b-card-text>
              </b-card>
              <h4 class="mt-3">Все</h4>
              <Table :getData="this.service.getCollections"
                     :perPage="50"
                     :table-fields="[
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
                        key: 'actions',
                        label: '',
                        sortable: false
                      },
                    ]"
              >
                <template v-slot="slotProps">
                  <b-button size="sm" variant="info" class="mr-2" @click="bindCollection(slotProps.item)">
                    <b-spinner small type="grow" v-if="idxClicked === slotProps.item.id"></b-spinner>
                    <b-icon v-else icon="plus"></b-icon>
                  </b-button>
                </template>
              </Table>
            </b-tab>
            <b-tab title="Категории">
              <h4 class="mt-3">Прикрепленные</h4>
              <p class="text-danger" v-if="!productData.categories.length">Пусто</p>
              <b-card v-else
                      class="pc-card mt-3 mr-3"
                      v-for="item in productData.categories"
                      :key="item.id"
                      :title="item.name"
                      :sub-title="item.description">
                <b-card-text>
                  <b-button variant="danger" class="mt-3" @click="unbindCategory(item.id)">
                    <b-spinner small type="grow" v-if="idxClicked === item.id"></b-spinner>
                    Открепить
                  </b-button>
                </b-card-text>
              </b-card>
              <h4 class="mt-3">Все</h4>
              <Table :getData="this.service.getCategories"
                     :perPage="50"
                     :table-fields="[
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
                    ]"
              >
                <template v-slot="slotProps">
                  <b-button size="sm" variant="info" class="mr-2" @click="bindCategory(slotProps.item)">
                    <b-spinner small type="grow" v-if="idxClicked === slotProps.item.id"></b-spinner>
                    <b-icon v-else icon="plus"></b-icon>
                  </b-button>
                </template>
              </Table>
            </b-tab>
            <b-tab title="Корнеры">
              <Table class="mt-3"
                     :getData="this.service.getCorners"
                     :table-fields="[
                      {
                        key: 'name',
                        label: 'Название',
                        sortable: true
                      },
                      {
                        key: 'type',
                        label: 'Тип',
                        sortable: true
                      },
                      {
                        key: 'concept',
                        label: 'Концепт',
                        sortable: true
                      },
                      {
                        key: 'status',
                        label: 'Статус',
                        sortable: true
                      },
                      {
                        key: 'foodHallId',
                        label: 'Фуд-холл',
                        sortable: true
                      },
                      {
                        key: 'actions',
                        label: '',
                        sortable: false
                      }
                    ]"
              >
                <template v-slot="slotProps">
                  <b-button size="sm" variant="info" class="mr-2" @click="bindCorners(slotProps.item)">
                    <b-spinner small type="grow" v-if="idxClicked === slotProps.item.id"></b-spinner>
                    <b-icon v-else icon="plus"></b-icon>
                  </b-button>
                </template>
              </Table>
            </b-tab>
          </b-tabs>
        </div>
      </b-col>
      <b-col md="6">
        <div class="product-changes mb-3" v-if="diffProductChanges.length">
          <b-card no-body class="mb-1" v-for="(item,idx) in diffProductChanges" :key="idx">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button class="d-flex justify-content-center align-items-center w-100" v-b-toggle="`product-changes-${idx}`" :variant="item.status === 'Pending' ? 'outline-info' : item.status === 'Reject' ? 'outline-danger' :'outline-secondary'">
                <span class="ml-auto">{{item.status === 'Pending' ? 'Ожидание' : item.status === 'Reject' ? 'Отклонено' :'Реальность'}}</span>
                <b-badge class="ml-auto" :variant="item.status === 'Pending' ? 'info' : 'secondary'">{{Object.keys(item.changes).length}}</b-badge>
              </b-button>
            </b-card-header>
            <b-collapse :id="`product-changes-${idx}`" role="tabpanel">
              <b-card-body>
                <b-card-text>
                  <b-row v-if="item.status === 'Pending'">
                    <b-col sm="12" class="text-right mb-3">
                      <b-button :disabled="(isEditItems[idx] && !!isEditItems[idx].length) ||
                                              !(productChangesToResolve[idx] && !!productChangesToResolve[idx].length)"
                                variant="success"
                                class="mr-1 d-inline-block"
                                size="sm"
                                @click="resolveChanges(item,idx)">
                        Принять
                      </b-button>
                      <b-button :disabled="isEditItems[idx] && !!isEditItems[idx].length"
                                variant="danger"
                                class="d-inline-block"
                                size="sm"
                                @click="rejectChanges(item)">
                        Отклонить
                      </b-button>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="8" class="d-flex align-items-center">
                      <span>Отметить все</span>
                    </b-col>
                    <b-col sm="4" class="text-right">
                      <b-form-group class="d-inline-block">
                        <b-form-checkbox-group
                            :name="`buttons-check-all`"
                            buttons
                            button-variant="outline-success"
                            size="sm"
                            v-model="checkAllCheckbox[idx]"
                        >
                          <b-form-checkbox @change="checkAll($event,idx)">
                            <b-icon icon="check"></b-icon>
                          </b-form-checkbox>
                        </b-form-checkbox-group>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row class="mb-1" v-for="(change,idx2) in item.changes" :key="idx2">
                    <b-col sm="4" class="d-flex align-items-center">
                      <span>{{productChangesFields[idx2]['text']}}</span>
                    </b-col>
                    <b-col sm="4">
                      <div class="pc-img" v-if="productChangesFields[idx2]['img']">
                        <b-img :src="item.changes[idx2]"></b-img>
                      </div>
                      <b-form-textarea v-else-if="productChangesFields[idx2]['textarea']" v-model="item.changes[idx2]" :plaintext="!(isEditItems[idx] && isEditItems[idx].indexOf(idx2) !== -1)" placeholder="Введите значение"></b-form-textarea>
                      <b-form-input v-else :type="productChangesFields[idx2]['type']" :number="productChangesFields[idx2]['type'] === 'number'" v-model="item.changes[idx2]" :plaintext="!(isEditItems[idx] && isEditItems[idx].indexOf(idx2) !== -1)" placeholder="Введите значение"></b-form-input>
                    </b-col>

                    <b-col sm="4" class="d-flex justify-content-end align-items-center" v-if="item.status === 'Pending'">
                      <b-form-group class="mb-0">
                        <b-form-checkbox-group
                            v-model="isEditItems[idx]"
                            :name="`buttons-edit-${idx2}`"
                            buttons
                            button-variant="primary"
                            size="sm"
                            class="mr-1"
                            v-if="productChangesFields[idx2]['editable']"
                        >
                          <b-form-checkbox :value="idx2">
                            <b-icon :icon="isEditItems[idx] && isEditItems[idx].indexOf(idx2) !== -1 ? 'check2-circle' : 'pencil'"></b-icon>
                          </b-form-checkbox>
                        </b-form-checkbox-group>

                        <b-form-checkbox-group
                            v-model="productChangesToResolve[idx]"
                            :name="`buttons-${idx2}`"
                            buttons
                            button-variant="outline-success"
                            size="sm"
                        >
                          <b-form-checkbox :disabled="isEditItems[idx] && isEditItems[idx].indexOf(idx2) !== -1" :value="idx2">
                            <b-icon icon="check"></b-icon>
                          </b-form-checkbox>
                        </b-form-checkbox-group>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
        <b-card no-body class="mb-3" v-else>
          <b-card-header class="p-1 text-info text-center">Нет изменений в статусе <code>"Pending"</code></b-card-header>
        </b-card>
      </b-col>
    </b-row>

    <b-modal v-model="isModalShown" id="modal-sm" size="sm" ok-only >{{modalText}}</b-modal>
  </div>
</template>

<script>
import ProductsService from "@/services/productsService";
const service = new ProductsService()
import _ from 'lodash';

import Table from "@/components/Table";

export default {
  name: 'EditProduct',
  components: {
    Table
  },
  data(){
    return {
      isLoading: this.$route.params.id ? true : false,
      isChangesLoading: true,
      idxClicked: null,
      isModalShown: false,
      modalText: '',
      productData: {},
      productChangesFields: {
        carbohydratesAmount: {text: 'Углеводы/100г', editable: true, type: 'number'},
        carbohydratesFullAmount: {text: 'Углеводы/Всего', editable: true, type: 'number'},
        energyAmount: {text: 'Энергия/100г', editable: true, type: 'number'},
        energyFullAmount: {text: 'Энергия/Всего', editable: true, type: 'number'},
        fatAmount: {text: 'Жиры/100г', editable: true, type: 'number'},
        fatFullAmount: {text: 'Жиры/Всего', editable: true, type: 'number'},
        proteinsAmount: {text: 'Белки/100г', editable: true, type: 'number'},
        proteinsFullAmount: {text: 'Белки/Всего', editable: true, type: 'number'},
        weight: {text: 'Вес', editable: true, type: 'number'},
        name: {text: 'Название', editable: true, type: 'text'},
        description: {text: 'Описание', textarea: true, editable: true, type: 'text'},
        code: {text: 'Артикул', editable: true, type: 'text'},
        imageUrl: {text: 'Картинка', img: true, editable: false, type: 'text'},
      },
      productChanges: {},
      productChangesToResolve: {},
      checkAllCheckbox:[],
      isEditItems: {},
      corner: {
        name: 'Не выбрано'
      },
      file: null,
      imgUrl: null,
      imgIdToDelete: null,
      isLoadingImageSubmitBtn: false,
      images:[],
      service: service,
      productDataToPost: {
        cookingTime: null,
        arealInfo: {
        }
      },
      isLoadingProductDataToPost: false
    }
  },
  async mounted(){
    const data = await this.getProductById(this.$route.params.id)

    this.setImages(data.images)

    if(data.cornerId){
      this.getCornerById(data.cornerId)
    }

    this.getProductChanges(this.$route.params.id)
  },
  computed:{
    statusesSelect(){
      const statusesText = ['Отклонен', 'Ожидание', 'Разрешен']
      const statuses = ['Reject','Pending','Resolve']

      return statuses.map((cur, idx) => {
        return {
          value: cur,
          text: statusesText[idx]
        }
      })
    },
    diffProductChanges(){
      if(this.productChanges.items) {
        const productDataCompare = this.getProductDataCompare()
        let diffArr = []

        const pendingChanges = this.productChanges.items.filter(cur=>cur.statusId === 'Pending')
        const sortedItems = this.sortProductChanges(pendingChanges)

        sortedItems.forEach(cur=>{
          let diffItem = {}
          diffItem.changes = this.difference(cur, productDataCompare)
          diffItem.changes.imageUrl = cur.imageUrl
          diffItem.status = cur.statusId
          diffItem.id = cur.id

          diffArr.push(diffItem)
        })
        return diffArr
      }else{
        return []
      }
    },
  },
  watch:{
    file(val){
      this.uploadImage(val)
    },
    'productDataToPost.arealInfo':{
      handler(val){
        console.log(val)
      },
      deep: true
    },
  },
  methods:{
    async setProducts(){
      const productId = this.productData.id
      const productDataToPost = this.productDataToPost
      const data = await service.setProducts({productId, productDataToPost})

      if(data.error){
        this.isModalShown = true
        this.modalText = data.error
      }else{
        this.isModalShown = true
        this.modalText = 'Данные успешно изменены'
      }

      return data
    },
    async getFileFromUrl(url){
      const blob = await fetch(url).then(r => r.blob())
      const name = url.substring(url.lastIndexOf('/')+1)
      return new File([blob], name)
    },
    async setImages(images){
       await Promise.all(images.map(async item => {
         const file = await this.getFileFromUrl(item.url)
         this.images.push({
          url: file ? URL.createObjectURL(file) : null,
          id: item.id
        })
      }))
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
      const data = await service.removeImage(this.productData.id, item.id)
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
    async uploadImage(file){
      let imgData = null

      if(file){
        imgData = new FormData()
        imgData.append('Image', file)

        this.isLoadingImageSubmitBtn = true

        const data = await service.uploadImage(this.productData.id, imgData)
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
    clearProductChangesToResolve(){
      for(const key in this.productChangesToResolve){
        this.$set(this.productChangesToResolve, key, [])
      }
    },
    async resolveChanges(item, idx){
      let resloveData = {
        status: 'Resolve'
      }
      const resolveDataArr = this.productChangesToResolve[idx]
      if(resolveDataArr) {
        resolveDataArr.forEach(cur => {
          resloveData[cur] = item.changes[cur]
        })

        const data = await service.updateStatusProductChanges(this.productData.id, item.id, resloveData)

        if(data.error){
          this.isModalShown = true
          this.modalText = data.error
        }else{
          resolveDataArr.forEach(cur => {
            const pdKeys = Object.keys(this.productData)
            const pdpKeys = Object.keys(this.productData.productParameters)
            if(pdKeys.indexOf(cur) !== -1){
              this.productData[`${cur}`] = this.diffProductChanges[idx].changes[`${cur}`]
            }else if(pdpKeys.indexOf(cur) !== -1){
              this.productData.productParameters[`${cur}`] = this.diffProductChanges[idx].changes[`${cur}`]
            }else if(cur === 'imageUrl') {
              // this.getFileFromUrl(this.diffProductChanges[idx].changes[`${cur}`])
              this.getImages(this.productData.id)
            }
          })

          this.productChanges.items.filter(cur=>cur.id===item.id)[0].statusId = 'Resolve'

          this.$set(this.checkAllCheckbox, idx, [])

          this.clearProductChangesToResolve()

          this.isModalShown = true
          this.modalText = 'Изменение принято'
        }
      }
    },
    async getImages(id){
      const data = await service.getImages(id)
      if (data.error) {
        this.isModalShown = true
        this.modalText = data.error
      } else {
        this.images = []
        this.setImages(data.items)
      }
    },
    async rejectChanges(item){
      let resloveData = {
        status: 'Reject'
      }


      const data = await service.updateStatusProductChanges(this.productData.id, item.id, resloveData)

      if(data.error){
        this.isModalShown = true
        this.modalText = data.error
      }else{
        this.productChanges.items.filter(cur=>cur.id===item.id)[0].statusId = 'Reject'
        this.clearProductChangesToResolve()

        this.isModalShown = true
        this.modalText = 'Изменение отклонено'
      }
    },
    checkAll(e,idx){
      if(e){
        this.$set(this.productChangesToResolve, idx, Object.keys(this.diffProductChanges[idx].changes))
      }else{
        this.$set(this.productChangesToResolve, idx, [])
      }
      // this.productChangesToResolve[idx] = new Array()
      // this.productChangesToResolve[idx].push(...Object.keys(this.diffProductChanges[idx].changes))
      // this.productChangesToResolve[idx].push(...Object.keys(this.diffProductChanges[idx].changes))
    },
    getProductChangesCompareObj(obj){
      let compareObj = {}
      Object.keys(obj).forEach(k => {
        compareObj[k] = obj[k]
      });
      return compareObj
    },
    sortProductChanges(obj){
      return obj.sort((a,b) => (a.statusId === 'Resolve') ? 1 : ((b.statusId === 'Resolve') ? -1 : 0));

    },
    difference(object, base) {
      function changes(object, base) {
        return _.transform(object, function(result, value, key) {
          if (base[key] !== undefined && !_.isEqual(value, base[key])) {
            result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value
          }
        });
      }
      return changes(object, base);
    },
    getProductDataCompare(){
      let productCompare = {}
      for(const key in this.productChangesFields){
        let val = this.getDeepValue(this.productData, key)

        if(val !== undefined){
          productCompare[key] = val
        }
      }
      return productCompare
    },
    getDeepValue(obj, keySearch) {
      let val = undefined

      for(const key in obj) {
        if(key === keySearch){
          val = obj[key]
          break
        }
        if(typeof obj[key] === "object") {
          val = this.getDeepValue(obj[key], keySearch)
          if(val !== undefined){
            break
          }
        }
      }

      return val

    },
    async getProductChanges(id){
      const data = await service.getProductChanges(id)
      this.isChangesLoading = false
      if(data.error){
        this.isModalShown = true
        this.modalText = data.error
      }else{
        this.productChanges = data
        // this.productChangesToResolve = Array(data.paginationInfo.count)
      }
    },
    async getProductById(id){
      const data = await service.getProductById(id)
      this.isLoading = false

      if(data.error){
        this.textDanger = data.error
      }else{
        this.productData = data

        this.productDataToPost.cookingTime = data.productParameters.cookingTime
        if(data.arealInfo !== null) {
          this.productDataToPost.arealInfo = data.arealInfo
        }
      }

      return data
    },
    async getCornerById(id){
      const data = await service.getCornerById(id)
      this.isLoading = false

      if(data.error){
        this.isModalShown = true
        this.modalText = data.error
      }else{
        this.corner = data
      }
    },
    async setStatus(status){
      const data = await service.updateStatus(status,this.productData.id)

      if(data.error){
        this.isModalShown = true
        this.modalText = data.error
      }else{
        this.isModalShown = true
        this.modalText = 'Статус обновлен'
      }
    },
    async unbindCollection(collectionId){
      this.idxClicked = collectionId
      const data = await service.unbindCollection(collectionId,this.productData.id)

      this.idxClicked = null

      if(data.error){
        this.isModalShown = true
        this.modalText = data.error
      }else{
        const idx = this.productData.collections.findIndex(x => x.id === collectionId);
        this.productData.collections.splice(idx,1)
      }
    },
    async bindCollection(item){
      console.log(item)
      this.idxClicked = item.id

      const data = await service.bindCollection(item.id,this.productData.id)

      this.idxClicked = null

      if(data.error){
        this.isModalShown = true
        this.modalText = data.error
      }else{
        const idx = this.productData.collections.findIndex(x => x.id === item.id);

        if(idx === -1){
          this.productData.collections.push(item)
        }else{
          this.isModalShown = true
          this.modalText = 'Такая коллекция уже прикреплена'
        }
      }
    },
    async unbindCategory(categoryId){
      this.idxClicked = categoryId
      const data = await service.deleteProductFromCategory({categoryId: categoryId, productId: this.productData.id})

      this.idxClicked = null

      if(data.error){
        this.isModalShown = true
        this.modalText = data.error
      }else{
        const idx = this.productData.categories.findIndex(x => x.id === categoryId);
        this.productData.categories.splice(idx,1)
      }
    },
    async bindCategory(item){
      console.log(item)
      this.idxClicked = item.id

      const data = await service.setProductToCategory({categoryId: item.id, productId: this.productData.id})

      this.idxClicked = null

      if(data.error){
        this.isModalShown = true
        this.modalText = data.error
      }else{
        const idx = this.productData.categories.findIndex(x => x.id === item.id);

        if(idx === -1){
          this.productData.categories.push(item)
        }else{
          this.isModalShown = true
          this.modalText = 'Такая категория уже прикреплена'
        }
      }
    },
    async unbindCorner(id){
      this.idxClicked = id

      const data = await service.unbindCorner(id, this.productData.id)

      this.idxClicked = null

      if(data.error){
        this.isModalShown = true
        this.modalText = data.error
      }else{
        this.corner = {name:'Не выбрано'}
      }
    },
    async bindCorners(item){
      console.log(item)
      this.idxClicked = item.id

      const data = await service.bindCorner(item.id, this.productData.id)

      this.idxClicked = null

      if(data.error){
        this.isModalShown = true
        this.modalText = data.error
      }else{
        this.corner = item
      }
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
.h3{
  font-weight: bold;
  font-size: initial;
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
</style>