import axios from 'axios'

const state = {
  portlets: null,
  layout: null
}

const getters = {

}

const actions = {
  async loadPortlets (context) {
    const portletList = await axios.get('/md/portlet')
    const layout = await axios.get('/md/layout')
    context.commit('setPortlets', portletList.data)
    context.commit('setLayout', layout.data)
  }
}

const mutations = {
  setPortlets (state, portlets) {
    state.portlets = portlets
  },
  setLayout (state, layout) {
    state.layout = layout
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
