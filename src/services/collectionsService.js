import axios from "axios";

export default class CollectionsService{
    async getCollections({pageIdx,perPage}) {
        return await axios({
            url: `/api/v1/Collections?paginateIndex=${pageIdx}&paginateSize=${perPage}`,
            method: 'get'
        })
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async getCollectionById(id) {
        return await axios({
            url: `/api/v1/Collections/${id}`,
            method: 'get'
        })
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async setCollectionById(payload) {
        return await axios.patch(
            `/api/v1/Collections/${payload.get('id')}`,
            payload
        )
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async createCollection(payload) {
        return await axios.post(
            `/api/v1/Collections`,
            payload
        )
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async uploadImage(id,imgData){
        return await axios.post(`/api/v1/Collections/${id}/upload_image`,imgData)
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            })
    }
    async removeImage(id){
        return await axios.delete(`/api/v1/Collections/${id}/image`)
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            })
    }
    async getImage(id){
        return await axios.get(`/api/v1/Collections/${id}/image`)
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            })
    }
    async deleteCollection(id) {
        return await axios({
            url: `/api/v1/Collections/${id}`,
            method: 'delete',
            data: {id}
        })
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
}