
const state = {
  songs: new Set()
}

// getters
const getters = {
  songList(state) {
    return Array.from(state.songs)
  }
}

// actions
const actions = {
  add({ commit }, song) {
    commit('addSong', song)
  },
  remove({ commit }, song) {
    commit('removeSong', song)
  }
}

// mutations
const mutations = {
  addSong(state, song) {
    state.songs.add(song)
    state.songs = new Set(state.songs)
  },
  removeSong(state, song) {
    state.songs.delete(song)
    state.songs = new Set(state.songs)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}