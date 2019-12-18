import musicApi from './../../api/music-api'

const state = {
  songs: [],
  categories: [],
  displaySong: null,
  explicitelyChosen: false
}

// getters
const getters = { }

// actions
const actions = {
  async getCategories({ commit }) {
    const categories = await musicApi.getCategories();
    commit('setCategories', categories)
  },
  async getSongs({ commit, state }, filter) {
    const songs = await musicApi.getSongs(filter);
    commit('setSongs', songs)
    if (!state.explicitelyChosen && songs[0]) {
      commit('setSong', songs[0])
    }
  },
  async getSong({ commit }, slug) {
    const displaySong = await musicApi.getSong(slug);
    commit('setSong', displaySong)
    commit('setExplicit', true)
    musicApi.songViewed(displaySong.slug)

    const songs = await musicApi.getSongs({ category: displaySong.category });
    commit('setSongs', songs)
  },
  async setSong({ commit, state }, slug) {
    const localSong = state.songs.find(song => song.slug === slug)
    musicApi.songViewed(localSong.slug)
    commit('setSong', localSong)
    commit('setExplicit', true)
  }
}

// mutations
const mutations = {
  setCategories(state, categories) {
    state.categories = categories
  },
  setSongs(state, songs) {
    state.songs = songs
  },
  setSong(state, song) {
    state.displaySong = song
  },
  setExplicit(state, explicit) {
    state.explicitelyChosen = explicit
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}