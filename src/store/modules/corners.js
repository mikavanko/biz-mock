import CornerService from "@/services/cornerService";
const service = new CornerService()
import lowerCasedObjKeys from "@/mixins/lowerCasedObjKeys";

export default {
    state: {
        corners: [],
        cornerById: null,
        cornerStatuses: [],
        cornersImages: []
    },
    mutations:{
        SET_CORNERS: (state, payload) => {
            state.corners = payload
        },
        SET_CORNERS_BY_ID: (state, payload) => {
            state.cornerById = payload
        },
        SET_CORNERS_STATUSES: (state, payload) => {
            state.cornerStatuses = payload
        },
        SET_CORNERS_IMAGES: (state, payload) => {
            state.cornersImages = payload
        },
    },
    actions:{
        GET_CORNERS: service.getCorners,
        GET_CORNERS_BY_ID: service.getCornersById,
        EDIT_CORNERS: service.editCorners,
        GET_CORNERS_STATUSES: service.getCornersStatuses,
        GET_CORNERS_IMAGES: service.getCornersImages,
        CREATE_CORNER: service.createCorner,
        SET_CORNERS_BY_ID: ({commit},payload)=>{
            commit('SET_CORNERS_BY_ID',lowerCasedObjKeys.lcObjKeys(payload))
        }
    },
    getters: {
        CORNERS: state => {
            return state.corners
        },
        CORNER_BY_ID: state => {
            return state.cornerById
        },
        CORNER_STATUSES: state => {
            return state.cornerStatuses
        },
        CORNERS_IMAGES: state => {
            return state.cornersImages
        },
    }
}