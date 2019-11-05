import musicApi from './../../api/music-api'

const state = {
  songs: [],
  categories: [],
  currentSong: null
}

// getters
const getters = { }

// actions
const actions = {
  async getCategories({ commit }) {
    const categories = await musicApi.getCategories();
    commit('setCategories', categories)
  }
}

// mutations
const mutations = {
  setCategories (state, categories) {
    state.categories = categories
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}