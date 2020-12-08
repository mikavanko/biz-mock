import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import axiosPlugin from 'vue-axios-cors'

Vue.use(Vuex);
Vue.use(axiosPlugin)

import foodHalls from "@/store/modules/foodHalls"
import corners from "@/store/modules/corners"

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export const store = new Vuex.Store({
    modules:{
        foodHalls,
        corners
    }
})