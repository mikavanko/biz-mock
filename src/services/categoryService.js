import axios from "axios";

export default class CategoryService{
    async getCategories({pageIdx,perPage}) {
        return await axios({
            url: `/api/v1/Categories?skip=${pageIdx}&take=${perPage}`,
            method: 'get'
        })
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async getCategoryById(id) {
        return await axios({
            url: `/api/v1/Categories/${id}`,
            method: 'get'
        })
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async setCategoryById(payload) {
        return await axios.put(
            `/api/v1/Categories/${payload.get('id')}`,
            payload
        )
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async createCategory(payload) {
        return await axios.post(
            `/api/v1/Categories`,
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
        return await axios.post(`/api/v1/Categories/${id}/image`,imgData)
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            })
    }
    async removeImage(id, imgId){
        return await axios.delete(`/api/v1/Categories/${id}/image/${imgId}`)
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            })
    }
    async getImage(id){
        return await axios.get(`/api/v1/Categories/${id}/image`)
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            })
    }
    async deleteCategory(id) {
        return await axios({
            url: `/api/v1/Categories/${id}`,
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
    async getProducts({pageIdx,perPage}) {
        return await axios({
            url: `/api/v1/Products?paginateIndex=${pageIdx}&paginateSize=${perPage}`,
            method: 'get'
        })
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async getCategoryProducts({pageIdx,perPage,categoryId}) {
        return await axios.get(`/api/v1/Categories/${categoryId}/products?skip=${pageIdx}&take=${perPage}`)
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async setProductToCategory({categoryId,productId}) {
        return await axios.post(`/api/v1/Categories/${categoryId}/products`,{categoryId,productId})
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async deleteProductFromCategory({categoryId,productId}) {
        return await axios.delete(`/api/v1/Categories/${categoryId}/products/${productId}`)
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
}