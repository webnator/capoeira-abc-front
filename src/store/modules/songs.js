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
  },
  async getSongs({ commit }, filter) {
    const songs = await musicApi.getSongs(filter);
    commit('setSongs', songs)
  }
}

// mutations
const mutations = {
  setCategories (state, categories) {
    state.categories = categories
  },
  setSongs (state, songs) {
    state.songs = songs
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}