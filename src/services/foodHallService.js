import axios from "axios";
import lowerCasedObjKeys from "@/mixins/lowerCasedObjKeys";

export default class FoodHallService{
    async getFoodhalls(ctx) {
        axios({url: `/api/v1/foodhalls/`, method: 'get'})
            .then(resp => {
                const data = resp.data
                const newData = lowerCasedObjKeys.lcArrOfObjKeys(data)

                ctx.commit('SET_FOODHALLS', newData)
            })
            .catch((error) => {
                console.log('error ' + error)
            });
    }
    getFoodHallsById(ctx, payload) {
        const fh = ctx.getters.FOODHALLS
        if (fh.length) {
            ctx.commit('SET_FOODHALLS_BY_ID', fh.find(item => item.id === payload))
        } else {
            axios({url: `/api/v1/foodhalls/${payload}`, method: 'get'})
                .then(resp => {
                    const data = resp.data
                    const lowerCasedKeysData = lowerCasedObjKeys.lcObjKeys(data)

                    ctx.commit('SET_FOODHALLS_BY_ID', lowerCasedKeysData)
                })
                .catch((error) => {
                    console.log('error ' + error)
                });
        }
    }
    async editFoodHalls(ctx, payload) {
        return await axios({url: `/api/v1/foodhalls/${payload.id}`, method: 'put', data: {...payload}})
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async getFoodHallsStatuses(ctx) {
        axios({url: `/api/v1/FoodHalls/statuses`, method: 'get'})
            .then(resp => {
                ctx.commit('SET_STATUSES', resp.data)
            })
            .catch((error) => {
                console.log('error ' + error)
            });
    }
    async createFoodHall(ctx,payload) {
        console.log('createFoodHall',payload)
        return await axios({url: `/api/v1/FoodHalls`, method: 'post', data: {...payload}})
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
}