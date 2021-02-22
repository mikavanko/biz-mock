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
    async createCorner(ctx, payload) {
        return await axios.post(`/api/v1/corners`,{...payload})
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async editCorners(ctx, payload) {
        return await axios.put(`/api/v1/corners/${payload.id}`,{...payload})
            .then(resp => resp)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async addCornerImage(ctx,{cornerId, formData, file}) {
        return await axios.post(`/api/v1/corners/${cornerId}/images`, formData,{
                headers: {
                    'accept': 'application/json',
                        'Accept-Language': 'en-US,en;q=0.8',
                        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                }
            })
            .then(resp => {
                const imgArr = ctx.getters.CORNERS_IMAGES
                imgArr.push(file)
                console.log(file,formData)

                ctx.commit('SET_CORNERS_IMAGES', imgArr)

                return resp.data
            })
            .catch((error) => {
                console.log('error',error)
                return {
                    error: error
                }
            });
    }
    async removeCornerImage(ctx,{cornerId, imgIdToDelete}) {
        return await axios.delete(`/api/v1/corners/${cornerId}/images/${imgIdToDelete}`)
            .then(resp => {
                const imgArr = ctx.getters.CORNERS_IMAGES
                const idx = imgArr.findIndex(item=>item.id === imgIdToDelete)
                imgArr.splice(idx, 1)

                ctx.commit('SET_CORNERS_IMAGES', imgArr)

                return resp.data
            })
            .catch((error) => {
                console.log('error',error)
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
        return await axios({url: `/api/v1/corners/${payload}/images`, method: 'get'})
            .then(resp => {
                ctx.commit('SET_CORNERS_IMAGES', resp.data)

                return resp.data
            })
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
}