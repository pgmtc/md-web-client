import Vue from 'vue'
import Vuex from 'vuex'
import portlets from './modules/portlets'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    portlets, user
  },
  actions: {
  },
  state: {
    counter: 0
  },
  mutations: {
    increment (state) {
      state.counter++
    }
  }
})
