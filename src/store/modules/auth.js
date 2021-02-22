import axios from "axios";

export default {
    state: {
        status: '',
        token: localStorage.getItem('token') || ''
    },
    mutations:{
        authSuccess(state, token){
            state.status = 'success'
            state.token = token
        },
        authError(state){
            state.status = 'error'
        },
        logout(state){
            state.status = ''
            state.token = ''
        },
    },
    actions:{
        async login({commit},{data, type}){
            return await axios.post(`/api/v1/auth/${type}`, data)
                .then(resp => {
                    const token = resp.data.AccessToken
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                    commit('authSuccess', token)

                    return resp.data
                })
                .catch((error) => {
                    commit('authError')
                    localStorage.removeItem('token')

                    return {
                        error: error
                    }
                })
        },
        logout({commit}){
            return new Promise((res)=>{
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                res()
            })
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    }
}