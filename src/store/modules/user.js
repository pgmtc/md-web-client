import axios from 'axios'

const state = {
  info: null
}

const getters = {

}

const actions = {
  async loadUser (context) {
    const userInfo = await axios.get('/md/user')
    context.commit('setUser', userInfo.data)
  }
}

const mutations = {
  setUser (state, userInfo) {
    state.info = userInfo
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
