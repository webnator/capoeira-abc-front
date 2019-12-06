import { setCookie, getCookie } from './../../services/cookies'

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
    setCookie('cm-playlist', JSON.stringify(getters.songList(state)))
  },
  remove({ commit }, song) {
    commit('removeSong', song)
    setCookie('cm-playlist', JSON.stringify(getters.songList(state)))
  },
  init({ commit }) {
    const cookiePlaylist = getCookie('cm-playlist')
    commit('setPlaylist', JSON.parse(cookiePlaylist) || [])
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
  },
  setPlaylist(state, songList) {
    state.songs = new Set(songList)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}