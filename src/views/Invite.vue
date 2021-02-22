<template>
  <div>
    <div class="page">
      <b-row class="row">
        <b-col xl="6" md="6" sm="12" cols="12">
          <h1>Отправить приглашение по e-mail</h1>
          <b-form inline class="flex-nowrap" @submit="onSubmit">
            <b-input-group prepend="@" class="mr-2 mb-2 flex-grow-1">
              <b-form-input required v-model="email" placeholder="E-mail" pattern="^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$"></b-form-input>
            </b-input-group>
            <b-button type="submit" variant="success" class="mb-2">Пригласить</b-button>
          </b-form>
        </b-col>
      </b-row>
    </div>
    <b-modal v-model="isModalShown" id="modal-sm" size="sm" ok-only >{{modalText}}</b-modal>
  </div>
</template>

<script>
import AuthService from "@/services/auth";
const service = new AuthService()

export default {
  name: 'Invite',
  data(){
    return {
      email: '',
      isModalShown: false,
      modalText: ''
    }
  },
  methods:{
    async onSubmit(e){
      e.preventDefault()

      const data = await service.requestCode(this.email)
      this.isModalShown = true

      if(data.error){
        this.modalText = data.error
      }else{
        this.modalText = 'Приглашение отправлено'
      }
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
</style>