import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null
    },
    getters: {
        loggedIn(state) {
            return state.token !== null
        }
    },
    mutations: {
        retrieveToken(state, token) {
            state.token = token
        },
        destroyToken(state) {
            state.token = null
        }
    },
    actions: {
        retrieveToken(context, credentials) {

            return new Promise((resolve, reject) => {
                axios.post('http://localhost:8000/api/login', {
                    email: credentials.email,
                    password: credentials.password
                }).then(response => {
                    const token = response.data.data.token
                    localStorage.setItem('access_token', token)
                    context.commit('retrieveToken', token)

                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })

        },
        destroyToken(context) {

            if(context.getters.loggedIn) {
                return new Promise((resolve, reject) =>  {
                    axios.post('http://localhost:8000/api/logout', '', {
                        headers: {Authorization: "Bearer " + context.state.token}
                    }).then(response => {
                        localStorage.removeItem('access_token')
                        context.commit('destroyToken')
                        resolve(response)
                    }).catch(error => {
                        localStorage.removeItem('access_token')
                        context.commit('destroyToken')
                        reject(error)
                    })
                })
            }
            
        }
    }
})

export default store