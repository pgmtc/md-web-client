import axios from 'axios'

const state = {
  portlets: null,
  layout: null,
  user: null,
  theme: null
}

const getters = {

}

const actions = {
  async loadContext (context) {
    const mdConfig = await axios.get('/md')
    context.commit('setPortlets', mdConfig.data.portlets)
    context.commit('setLayout', mdConfig.data.layout)
    context.commit('setUser', mdConfig.data.user)
    context.commit('setTheme', mdConfig.data.theme)
  }
}

const mutations = {
  setPortlets (state, md) {
    state.portlets = md
  },
  setLayout (state, layout) {
    state.layout = layout
  },
  setUser (state, user) {
    state.user = user
  },
  setTheme (state, theme) {
    state.theme = theme
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
