import Vue from 'vue'
import Vuex from 'vuex'
import md from './modules/md'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    md
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
