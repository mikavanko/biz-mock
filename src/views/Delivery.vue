<template>
  <div class="page">
    <b-row>
      <b-col md="9">
        <h1>Доставка</h1>
        <div class="text-center" v-if="isLoading">
          <b-spinner variant="secondary"></b-spinner>
        </div>
        <p class="text-danger" v-else-if="textDanger">{{textDanger}}</p>
        <div class="product-changes mb-3" v-else>
          <b-card no-body class="mb-1" v-for="(item,idx) in foodHalls" :key="idx">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button class="d-flex justify-content-center align-items-center w-100" v-b-toggle="`delivery-tab-${idx}`" variant="outline-info">
                <span class="text-center">{{item.Name}}</span>
<!--                <b-badge class="ml-auto" :variant="item.status === 'Pending' ? 'info' : 'secondary'">{{Object.keys(item.changes).length}}</b-badge>-->
              </b-button>
            </b-card-header>
            <b-collapse :id="`delivery-tab-${idx}`" role="tabpanel">
              <b-card-body>
                <b-card-text>
                  <b-row>
<!--                    <b-col sm="12" class="mb-3" v-if="!products.filter(pr=>pr.foodHallId === item.Id).length">-->
<!--                      <div class="text-center">-->
<!--                        <b-spinner variant="secondary"></b-spinner>-->
<!--                      </div>-->
<!--                    </b-col>-->
<!--                    <b-col sm="12" class="mb-3" v-else>-->
<!--                      <b-table-->
<!--                          thead-class="bg-light"-->
<!--                          small-->
<!--                          hover-->
<!--                          :items="products.find(pr=>pr.foodHallId === item.Id).items"-->
<!--                          :fields="tableFields"-->
<!--                          :current-page="products.find(pr=>pr.foodHallId === item.Id).curPage"-->
<!--                          :per-page="0"-->
<!--                          sort-compare-locale="en">-->
<!--                        <template v-slot:cell(actions)="item">-->
<!--                          <router-link :to="{ name:'editProducts', params: { id: item.item.id }}">-->
<!--                            <b-button size="sm" variant="info" class="mr-2">-->
<!--                              <b-icon icon="pencil"></b-icon>-->
<!--                            </b-button>-->
<!--                          </router-link>-->
<!--                        </template>-->
<!--                      </b-table>-->
<!--                      <b-row>-->
<!--                        <b-col sm="8" class="d-flex align-items-center">-->
<!--                          <b-pagination class="mr-3 mb-0"-->
<!--                                        size="md"-->
<!--                                        :total-rows="products.find(pr=>pr.foodHallId === item.Id).paginationInfo.count"-->
<!--                                        v-model="products.find(pr=>pr.foodHallId === item.Id).curPage"-->
<!--                                        :per-page="perPage"></b-pagination>-->
<!--                        </b-col>-->
<!--                      </b-row>-->
<!--                    </b-col>-->
                    <b-col>
                      <Table :getData="service.getProductsByFoodHalls"
                             :queryParams="{key: 'foodHallId', value: item.Id}"
                             :table-fields="tableFields"
                      >
                        <template v-slot:delivery="slotProps">
                          <div class="delivery-actions d-flex justify-content-center align-items-center mb-1">
                            <template v-if="deliveryPrices.filter(dp => dp.id === slotProps.item.id && dp.foodhallId === item.Id).length">
                              <p class="text-danger mb-0" v-if="deliveryPrices.find(dp => dp.id === slotProps.item.id && dp.foodhallId === item.Id).isDeleted">Стоимость заказа удалена</p>
                              <template v-else>
                                <b-form-input type="number"
                                              size="sm"
                                              class="mr-1"
                                              v-model="deliveryPrices.find(dp => dp.id === slotProps.item.id && dp.foodhallId === item.Id).startRange"
                                              placeholder="От (р.)"></b-form-input>
                                <b-form-input type="number"
                                              size="sm"
                                              class="mr-1"
                                              v-model="deliveryPrices.find(dp => dp.id === slotProps.item.id && dp.foodhallId === item.Id).endRange"
                                              placeholder="До (р.)"></b-form-input>
                                <b-form-input type="number"
                                              size="sm"
                                              class="mr-1"
                                              v-model="deliveryPrices.find(dp => dp.id === slotProps.item.id && dp.foodhallId === item.Id).price"
                                              placeholder="Цена (р.)"></b-form-input>

                                <b-button :disabled="!deliveryPrices.find(dp => dp.id === slotProps.item.id && dp.foodhallId === item.Id).startRange.toString() ||
                                                  !deliveryPrices.find(dp => dp.id === slotProps.item.id && dp.foodhallId === item.Id).price.toString()"
                                          size="sm"
                                          variant="success"
                                          class="mr-1"
                                          @click="editDeliveryPrice(deliveryPrices.find(dp => dp.id === slotProps.item.id && dp.foodhallId === item.Id), item.Id)">
                                  <b-spinner small type="grow" v-if="idxClicked === deliveryPrices.find(dp => dp.id === slotProps.item.id && dp.foodhallId === item.Id).id"></b-spinner>
                                  <b-icon v-else icon="pencil"></b-icon>
                                </b-button>
                                <b-button size="sm"
                                          variant="danger"
                                          class="mr-1"
                                          @click="deleteDeliveryPrice(deliveryPrices.find(dp => dp.id === slotProps.item.id && dp.foodhallId === item.Id).id)">
                                  <b-spinner small type="grow" v-if="idxClicked === deliveryPrices.find(dp => dp.id === slotProps.item.id && dp.foodhallId === item.Id).id"></b-spinner>
                                  <b-icon v-else icon="x"></b-icon>
                                </b-button>
                              </template>
                            </template>
                            <template v-else>
                                <b-form-input type="number"
                                              size="sm"
                                              class="mr-1"
                                              v-model="slotProps.item.startRange"
                                              placeholder="От (р.)"></b-form-input>
                                <b-form-input type="number"
                                              size="sm"
                                              class="mr-1"
                                              v-model="slotProps.item.endRange"
                                              placeholder="До (р.)"></b-form-input>
                                <b-form-input type="number"
                                              size="sm"
                                              class="mr-1"
                                              v-model="slotProps.item.deliveryPrice"
                                              placeholder="Цена (р.)"></b-form-input>

                                <b-button :disabled="!slotProps.item.startRange ||
                                                !slotProps.item.deliveryPrice"
                                          size="sm"
                                          variant="info"
                                          class="mr-1"
                                          @click="createDeliveryPrice(slotProps.item, item.Id)">
                                  <b-spinner small type="grow" v-if="idxClicked === slotProps.item.id"></b-spinner>
                                  <b-icon v-else icon="plus"></b-icon>
                                </b-button>
                            </template>
                          </div>
                        </template>
                      </Table>
                    </b-col>
                  </b-row>
                </b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import DeliveryService from "@/services/deliveryService";
import Table from "@/components/Table";
const service = new DeliveryService()

export default {
  name: 'Delivery',
  components: {
    Table
  },
  data(){
    return{
      isLoading: true,
      foodHallsSearch: '',
      foodHalls: [],
      products: [],
      deliveryPrices: [],
      textDanger: '',
      perPage: 20,
      idxClicked: null,
      tableFields: [
        {
          key: 'name',
          label: 'Название',
          sortable: true
        },
        {
          key: 'actions',
          label: '',
          sortable: false
        },
      ],
      service: service
    }
  },
  mounted() {
    this.getFoodHalls()
    this.getDeliveryPrices()
  },
  methods:{
    async getFoodHalls(){
      const data = await service.getFoodHalls()
      this.isLoading = false

      if(data.error){
        this.textDanger = data.error
      }else{
        this.foodHalls = data
        // this.getProductsByFoodHalls()
      }
    },
    async createDeliveryPrice(item,foodhallId){
      this.idxClicked = item.id
      const obj = {
        id: item.id,
        startRange: parseFloat(item.startRange),
        endRange: item.endRange === '' ? null : parseFloat(item.endRange),
        foodhallId: foodhallId,
        price: parseFloat(item.deliveryPrice)
      }
      const data = await service.createDeliveryPrices(obj)
      this.idxClicked = null

      if(data.error){
        this.textDanger = data.error
      }else{
        this.deliveryPrices.push(obj)
      }
    },
    async editDeliveryPrice(item){
      this.idxClicked = item.id
      const obj = {
        startRange: parseFloat(item.startRange),
        endRange: item.endRange === '' ? null : parseFloat(item.endRange),
        price: parseFloat(item.price)
      }
      const data = await service.editDeliveryPrices(item.id,obj)
      this.idxClicked = null

      if(data.error){
        this.textDanger = data.error
      }
    },
    async deleteDeliveryPrice(id){
      this.idxClicked = id
      const data = await service.deleteDeliveryPrices(id)
      this.idxClicked = null

      if(data.error){
        this.textDanger = data.error
      }else{
        this.deliveryPrices.find(item=>item.id === id).isDeleted = true
      }
    },
    async getDeliveryPrices(){
      const data = await service.getDeliveryPrices()
      // this.isLoading = false

      if(data.error){
        this.textDanger = data.error
      }else{
        this.deliveryPrices = data.items
        // this.getProductsByFoodHalls()
      }
    },
    // async getProductsByFoodHalls(){
    //   await Promise.all(this.foodHalls.map(async obj => {
    //         const data = await service.getProductsByFoodHalls({foodHallId: obj.Id, pageIdx: 0, perPage: 20})
    //         data.foodHallId = obj.Id
    //         data.curPage = 1
    //         this.products.push(data)
    //       }
    //   ));
    // },
  },
  watch: {
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