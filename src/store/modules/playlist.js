
const state = {
  songs: new Set()
}

// getters
const getters = {
  songList(state) {
    console.log(state.songs)
    return Array.from(state.songs)
  }
}

// actions
const actions = {
  add({ commit }, song) {
    commit('addSong', song)
  }
}

// mutations
const mutations = {
  addSong(state, song) {
    state.songs.add(song)
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