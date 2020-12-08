import FoodHallService from "@/services/foodHallService"
const service = new FoodHallService()
import lowerCasedObjKeys from "@/mixins/lowerCasedObjKeys";

export default {
    state: {
        foodHalls: [],
        foodHallById: null,
        statuses: [],
    },
    mutations: {
        SET_FOODHALLS: (state, payload) => {
            state.foodHalls = payload
        },
        SET_FOODHALLS_BY_ID: (state, payload) => {
            state.foodHallById = payload
        },
        SET_STATUSES: (state, payload) => {
            state.statuses = payload
        },
        SET_FOODHALLS_RESP_STATUS: (state, payload) => {
            state.foodHallsRespStatus = payload
        },
    },
    actions: {
        GET_FOODHALLS: service.getFoodhalls,
        GET_FOODHALLS_BY_ID: service.getFoodHallsById,
        EDIT_FOODHALLS: service.editFoodHalls,
        GET_STATUSES: service.getFoodHallsStatuses,
        CREATE_FOODHALL: service.createFoodHall,
        SET_FOODHALLS_BY_ID: ({commit},payload)=>{
            commit('SET_FOODHALLS_BY_ID',lowerCasedObjKeys.lcObjKeys(payload))
        }
    },
    getters: {
        FOODHALLS: state => {
            return state.foodHalls
        },
        FOODHALL_BY_ID: state => {
            return state.foodHallById
        },
        STATUSES: state => {
            return state.statuses
        },
        FOODHALLS_RESP_STATUS: state => {
            return state.foodHallsRespStatus
        },
    }
}