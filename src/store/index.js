import Vue from 'vue'
import Vuex from 'vuex'

import songs from './modules/songs'
import playlist from './modules/playlist'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    songs,
    playlist
  }
})
