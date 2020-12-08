<template>
    <div>
      <div class="page playground-page">
        <div class="row">
          <div class="col-lg-9">
            <h1>Площадки</h1>

            <ul class="menu">
              <li class="menu-item">
                <router-link to="/playgrounds/foodhall">Фуд-холлы</router-link>
              </li>
              <li class="menu-item">
                <router-link to="/playgrounds/corners">Арендаторы</router-link>
              </li>
              <li class="menu-item">
                <router-link to="/playgrounds/collections">Коллекции</router-link>
              </li>
              <li class="menu-item">
                <router-link to="/playgrounds/products">Продукты</router-link>
              </li>
              <li class="menu-item">
                <router-link to="/playgrounds/delivery">Доставка</router-link>
              </li>
              <li class="menu-item">
                <router-link to="/playgrounds/categories">Категории</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Playgrounds'
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
.menu{
  list-style: none;
  padding: 0;

  &-item{
    padding: 7px 20px;

    border-bottom: 1px solid #EEEEEE;

    &--main{
      background: #EEEEEE;
    }

    a{
      color: #000;
    }
  }
}
</style>