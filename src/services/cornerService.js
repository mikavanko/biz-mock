import axios from "axios";
import lowerCasedObjKeys from "@/mixins/lowerCasedObjKeys";

export default class CornerService{
    async getCorners(ctx) {
        axios({url: `/api/v1/corners/`, method: 'get'})
            .then(resp => {
                const data = resp.data
                const newData = lowerCasedObjKeys.lcArrOfObjKeys(data)

                ctx.commit('SET_CORNERS', newData)
            })
            .catch((error) => {
                console.log('error ' + error)
            });
    }
    getCornersById(ctx, payload) {
        const cn = ctx.getters.CORNERS
        if (cn.length) {
            ctx.commit('SET_CORNERS_BY_ID', cn.find(item => item.id === payload))
        } else {
            axios({url: `/api/v1/corners/${payload}`, method: 'get'})
                .then(resp => {
                    const data = resp.data
                    const lowerCasedKeysData = lowerCasedObjKeys.lcObjKeys(data)

                    ctx.commit('SET_CORNERS_BY_ID', lowerCasedKeysData)
                })
                .catch((error) => {
                    console.log('error ' + error)
                });
        }
    }
    async editCorners(ctx, payload) {
        let req = []
        req[0] = axios.put(`/api/v1/corners/${payload[0].id}`,{...payload[0]})

        if(payload[1]) {
            req[1] = axios.post(`/api/v1/corners/${payload[0].id}/images`, payload[1], {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${payload[1]._boundary}`,
                }
            })
        }
        if(payload[2]) {
            req[2] = axios.delete(`/api/v1/corners/${payload[0].id}/images/${payload[2]}`)
        }

        return axios.all(req)
            .then(resp => resp)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async createCorner(ctx, payload) {
        let req = []
        req[0] = axios.post(`/api/v1/corners`,{...payload[0]})

        if(payload[1]) {
            req[1] = axios.post(`/api/v1/corners/${payload[0].id}/images`, payload[1], {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${payload[1]._boundary}`,
                }
            })
        }
        if(payload[2]) {
            req[2] = axios.delete(`/api/v1/corners/${payload[0].id}/images/${payload[2]}`)
        }

        return axios.all(req)
            .then(resp => resp)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async getCornersStatuses(ctx) {
        axios({url: `/api/v1/Corners/statuses`, method: 'get'})
            .then(resp => {
                ctx.commit('SET_CORNERS_STATUSES', resp.data)
            })
            .catch((error) => {
                console.log('error ' + error)
            });
    }
    async getCornersImages(ctx,payload) {
        axios({url: `/api/v1/corners/${payload}/images`, method: 'get'})
            .then(resp => {
                ctx.commit('SET_CORNERS_IMAGES', resp.data)
            })
            .catch((error) => {
                console.log('error ' + error)
            });
    }
}