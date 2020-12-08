import axios from "axios";

export default class DeliveryService{
    async getFoodHalls() {
        return await axios.get(`/api/v1/FoodHalls`)
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async getProductsByFoodHalls({foodHallId,pageIdx,perPage}) {
        return await axios.get(`/api/v1/Products/by_foodhall?foodhallId=${foodHallId}&&paginateIndex=${pageIdx}&paginateSize=${perPage}`)
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async getDeliveryPrices() {
        return await axios.get(`/api/v1/DeliveryPrices?paginateSize=5000`)
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async createDeliveryPrices(obj) {
        return await axios.put(`/api/v1/DeliveryPrices`,{...obj})
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async editDeliveryPrices(id,obj) {
        return await axios.patch(`/api/v1/DeliveryPrices/${id}`,{...obj})
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
    async deleteDeliveryPrices(id) {
        return await axios.delete(`/api/v1/DeliveryPrices/${id}`)
            .then(resp => resp.data)
            .catch((error) => {
                return {
                    error: error
                }
            });
    }
}