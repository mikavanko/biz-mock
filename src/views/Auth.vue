<template>
  <div>
    <div class="page">
      <b-row class="row">
        <b-col xl="4" md="6" sm="8" cols="12" offset-xl="4" offset-md="3" offset-sm="2">
          <h1 class="text-center">Вход</h1>
          <b-form @submit="onSubmit">
            <b-input-group append="@" class="mr-2 mb-2 flex-grow-1">
              <b-form-input required
                            v-model="email"
                            placeholder="E-mail"
                            pattern="^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                            type="email"
              ></b-form-input>
            </b-input-group>
            <b-input-group append="*" class="mr-2 mb-2 flex-grow-1">
              <b-form-input required
                            v-model="password"
                            placeholder="Пароль"
                            pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                            type="password"
              ></b-form-input>
            </b-input-group>

            <b-button type="submit" variant="success" class="mb-2 w-100">
              <b-spinner small type="grow" v-if="isLoading" class="mr-2"></b-spinner>
              <template v-else>
                <span v-if="this.emailToken.length">Установить пароль</span>
                <span v-else>Войти</span>
              </template>
            </b-button>
            <p class="text-danger" v-if="errorText">{{errorText}}</p>
          </b-form>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
// import AuthService from "@/services/auth";
// const service = new AuthService()

export default {
  name: 'Invite',
  data(){
    return {
      email: '',
      emailToken: '',
      password: '',
      errorText: '',
      isLoading: false
    }
  },
  created(){
    this.email = this.$route.query.email || ''
    this.emailToken = this.$route.query.email_token && this.$route.query.email_token.replaceAll(' ','+') || ''
  },
  methods:{
    async onSubmit(e){
      e.preventDefault()
      // alert(service)
      const Email = this.email
      const Password = this.password
      const EmailToken = this.emailToken

      const data = {
        Email,
        ...(EmailToken.length && {EmailToken}),
        Password
      }

      const type = EmailToken.length ? 'verifyEmail' : 'loginWithPassword'

      this.isLoading = true

      this.$store.dispatch('login', {data, type})
        .then((resp)=>{
          this.isLoading = false

          const err = resp.error

          if(err){
            if(err.response.data.errorCode === 'InvalidPassword'){
              this.errorText = 'Неверное имя пользователя или пароль.'
            }else if(err.response.data.errorCode === 'InvalidToken'){
              this.errorText = 'Неверный верификационный код Email.'
            }else{
              this.errorText = err
            }
          }else{
            this.$router.push('/')
          }
        })
        .catch(err => {
          console.log('ERROR', err)
          this.isLoading = false
        })
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