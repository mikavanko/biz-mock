<template>
  <div>
    <b-navbar toggleable="lg" class="navbar">
      <div class="container">
        <b-navbar-brand to="/"><img src="@/assets/logo.svg" alt="logo"><span class="logo-sub">Администрирование</span></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item class="nav-link" to="/profile">Дмитрий</b-nav-item>
            <b-nav-item class="nav-link" to="/signout">Выйти</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
    <Breadcrumbs />
    <div class="container">
        <router-view />
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs';

export default {
  name: 'DefaultLayout',
  components:{
    Breadcrumbs
  },
  mounted(){
  }
}
</script>

<style lang="scss">
  .navbar{
    background-color: #EEEEEE;
  }
  .logo-sub{
    font-size: 14px;
    color: #C4C4C4;
    margin-left: 14px;
  }
</style>