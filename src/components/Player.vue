<template>
  <div id="player" :class="{ hidden: !visible }">

    <v-btn class="mx-2" tile small @click="previous">
      <v-icon dark>mdi-skip-previous</v-icon>
    </v-btn>
    <v-btn class="mx-2" tile small @click="playVideo">
      <v-icon dark>mdi-play-pause</v-icon>
    </v-btn>
    <v-btn class="mx-2" tile small @click="next">
      <v-icon dark>mdi-skip-next</v-icon>
    </v-btn>
    <v-btn class="mx-2" tile small @click="togglePlayer">
      <v-icon dark>{{ `mdi-chevron-${ visible ? 'down' : 'up' }-circle-outline` }}</v-icon>
    </v-btn>

    <div id="video-player" v-show="visible" v-if="songs.length > 0">
      {{ currentSong.title }} - {{ currentTime }}
      <youtube
        v-show="false"
        ref="youtube"
        :video-id="videoId"
        :player-vars="playerVars"
        @ended="next"
        @cued="playVideo"
        @playing="stateChanged"
        @paused="stateChanged"
      ></youtube>
    </div>


  </div>
</template>

<script>

import { mapGetters } from 'vuex'

const PLAYER_CONFIG = {
  autoplay: 0,
  controls: 0,
  disablekb: 1,
  fs: 0,
  iv_load_policy: 3,
  modestbranding: 1,
  rel: 0,
  showinfo: 0
}

export default {
  name: 'Player',
  data() {
    return {
      playingIndex: null,
      playerVars: PLAYER_CONFIG,
      visible: true
    }
  },
  mounted() {
    this.playingIndex = 0
  },
  methods: {
    getIdFromUrl(url) {
      return this.$youtube.getIdFromUrl(url)
    },
    stateChanged(state) {
      console.log('--->', state)
    },
    playVideo() {
      if (this.player) {
        this.player.playVideo()
      }
    },
    stopVideo() {
      if (this.player) {
        this.player.stopVideo()
      }
    },
    next() {
      if (this.playingIndex < (this.songs.length - 1)) {
        this.playingIndex++
      } else {
        this.playingIndex = 0
        this.stopVideo()
      }
    },
    previous() {
      if (this.playingIndex > 0) {
        this.playingIndex--;
      } else {
        this.playingIndex = 0
        this.stopVideo()
      }
    },
    togglePlayer() {
      this.visible = !this.visible;
    }
  },
  computed: {
    ...mapGetters('playlist', {
      songs: 'songList'
    }),
    videoId() {
      if (!this.currentSong) { return null }
      return this.getIdFromUrl(this.currentSong.media.videoLink)
    },
    currentSong() {
      return this.songs[ this.playingIndex ]
    },
    player() {
      if (this.$refs.youtube) {
        return this.$refs.youtube.player
      }
      return null
    },
    currentTime() {
      if (!this.player) { return 0 }
      return this.player.getCurrentTime()
    }
  }
}
</script>
<style scoped lang="scss">

#player {
  position: fixed;
  bottom: 0px;
  right: 0px;
  background-color: var(--v-accent-base);
  width: 800px;
  height: 600px;
  z-index: 100;

  &.hidden {
    height: 50px;
  }
}

</style>
