import axios from "axios";

const CancelToken = axios.CancelToken;

let cancel;

export default class ProductsService{
    async getProducts({pageIdx,perPage}) {
        // Cancel previous request
        if (cancel !== undefined) {
            cancel();
        }
        return await axios.get(`/api/v1/Products?paginateIndex=${pageIdx}&paginateSize=${perPage}`,{
                cancelToken: new CancelToken(function executor(c) {
                    cancel = c;
                })
            })
            .then(resp => resp.data)
            .catch((error) => {
                if (axios.isCancel(error)) {
                    return 'loading'
                }else{
                    return {
                        error: error
                    }
                }
            });
    }
    async getProductByFilter({name,article}) {
        // Cancel previous request
        if (cancel !== undefined) {
            cancel();
        }
        return await axios.post(`/api/v1/Products/by_filter`,{
            ...(name && {name}),
            ...(article && {article})
        },{
            cancelToken: new CancelToken(function executor(c) {
                cancel = c;
            })
        })
            .then(resp => resp.data)
            .catch((error) => {
                if (axios.isCancel(error)) {
                    return 'loading'
                }else{
                    return {
                        error: error
                    }
                }
            });
    }
    async setProducts({productId,productDataToPost}) {
        return await axios.post(`/api/v1/Products/${productId}`, productDataToPost)
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async getProductsByStatus({pageIdx,perPage,curStatus}) {
        // Cancel previous request
        if (cancel !== undefined) {
            cancel();
        }
        return await axios.get(`/api/v1/Products/by_status?status=${curStatus}&paginateIndex=${pageIdx}&paginateSize=${perPage}`,{
                cancelToken: new CancelToken(function executor(c) {
                    cancel = c;
                })
            })
            .then(resp => resp.data)
            .catch((error) => {
                if (axios.isCancel(error)) {
                    return 'loading'
                }else{
                    return {
                        error: error
                    }
                }
            });
    }
    async getProductById(id) {
        return await axios({
            url: `/api/v1/Products/${id}`,
            method: 'get',

        })
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async unbindCollection(collectionId,id) {
        return await axios({
            url: `/api/v1/Products/${id}/unbind_collection`,
            method: 'post',
            data: {
                "collectionId": collectionId
            }
        })
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async bindCollection(collectionId,id) {
        return await axios({
            url: `/api/v1/Products/${id}/bind_collection`,
            method: 'post',
            data: {
                "collectionId": collectionId
            }
        })
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async unbindCorner(cornerId,id) {
        return await axios({
            url: `/api/v1/Products/${id}/unbind_corner`,
            method: 'post',
            data: {
                "cornerId": cornerId
            }
        })
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async bindCorner(cornerId,id) {
        return await axios({
            url: `/api/v1/Products/${id}/bind_corner`,
            method: 'post',
            data: {
                "cornerId": cornerId
            }
        })
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async getCorners() {
        return await axios({
            url: `/api/v1/Corners`,
            method: 'get'
        })
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async getCornerById(id) {
        return await axios({
            url: `/api/v1/Corners/${id}`,
            method: 'get'
        })
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
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
    async updateStatus(status,id) {
        return await axios({
            url: `/api/v1/Products/${id}/update_status`,
            method: 'post',
            data: {
                "productStatus": status
            }
        })
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async getProductChanges(id) {
        return await axios({
            url: `/api/v1/Products/${id}/product_changes`,
            method: 'get'
        })
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async updateStatusProductChanges(id, productChangeId, payload) {
        return await axios({
            url: `/api/v1/Products/${id}/product_changes/${productChangeId}/update_status`,
            method: 'post',
            data:{...payload}
        })
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async getImages(id){
        return await axios.get(`/api/v1/Products/${id}/images`)
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            })
    }
    async uploadImage(id,imgData){
        return await axios.post(`/api/v1/Products/${id}/images`,imgData)
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            })
    }
    async removeImage(id,imgIdToDelete){
        return await axios.delete(`/api/v1/Products/${id}/images/${imgIdToDelete}`)
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            })
    }
    async launchMenuLoad({menuLoad}){
        return await axios.post(`/api/v1/FoodhallCashbox/launchMenuLoad`,menuLoad)
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            })
    }
    async getCashboxIdByFoodHallId({id}){
        return await axios.get(`/api/v1/FoodhallCashbox/${id}`)
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            })
    }
}