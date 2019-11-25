<template>
  <div id="player" v-if="songs.length">
    <div class="playlist" :class="{ hidden: !visible }">


      <v-list dense>
        <v-list-item-group>
          <v-list-item v-for="(song, index) of songs" :key="index" @click="selectSong(index)">
            <v-list-item-icon>
              <v-icon>{{ currentSong && currentSong.slug !== song.slug ? 'mdi-checkbox-blank-circle-outline' : 'mdi-chevron-right-circle' }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="song.title"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon x-small>
                <v-icon dark>mdi-youtube-tv</v-icon>
              </v-btn>
              <v-btn icon x-small @click="removeSong(index)">
                <v-icon dark>mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
    <div class="player">
      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="8" class="controls">
            <v-btn class="control" icon x-small @click="previous" :disabled="playingIndex === 0">
              <v-icon dark>mdi-rewind</v-icon>
            </v-btn>
            <v-btn class="play" icon x-large @click="playVideo">
              <v-icon dark>{{ `mdi-${playerState === 1 ? 'pause' : 'play'}` }}</v-icon>
            </v-btn>
            <v-btn class="control" icon x-small @click="next" :disabled="playingIndex >= songs.length - 1">
              <v-icon dark>mdi-fast-forward</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn icon small @click="toggleMute">
              <v-icon dark>{{ `mdi-volume-${ isMuted ? 'high' : 'off'}` }}</v-icon>
            </v-btn>
            <v-btn icon small @click="togglePlayer">
              <v-icon dark>{{ `mdi-chevron-${ visible ? 'down' : 'up' }-circle-outline` }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row no-gutters v-if="currentSong">
          <v-col cols="8">
            {{ currentSong.title }}
          </v-col>
          <v-col cols="4">
            {{ song.currentTime }} / {{ song.duration }}
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div id="video-player" v-if="songs.length"> 
      <youtube
        v-show="false"
        ref="youtube"
        :video-id="videoId"
        :player-vars="playerVars"
        
        @ended="next"
        @cued="playVideo"
        @playing="stateChanged"
        @paused="stateChanged"
        @ready="playerLoaded"
      ></youtube>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import moment from 'moment'

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

function resetSongModel() {
  return {
    duration: '00:00',
    currentTime: '00:00'
  }
}

export default {
  name: 'Player',
  data() {
    return {
      playingIndex: null,
      playerVars: PLAYER_CONFIG,
      visible: false,
      song: resetSongModel(),
      isMuted: false,
      playerState: -1
    }
  },
  mounted() {
    this.playingIndex = 0
  },
  methods: {
    getIdFromUrl(url) {
      return this.$youtube.getIdFromUrl(url)
    },
    playerLoaded() {
      this.player.addEventListener('onStateChange', this.stateChanged)
    },
    stateChanged({ target, data: state }) {
      let timer;
      this.playerState = state
      if (state === 1) {
        this.song.duration = moment(target.getDuration() * 1000).format('mm:ss')
        if (!timer) {
          timer = setInterval(() => {
            try {
              this.song.currentTime = moment(target.getCurrentTime() * 1000).format('mm:ss')
            } catch (err) {
              console.error('Something happened', { err })
              clearInterval(timer)
            }
          }, 1000)
        }
      }
    },
    playVideo() {
      if (this.playerState !== 1) {
        this.player.playVideo()
      } else {
        this.player.pauseVideo()
      }
    },
    stopVideo() {
      this.player.stopVideo()
    },
    next() {
      this.song = resetSongModel()
      if (this.playingIndex < (this.songs.length - 1)) {
        this.playingIndex++
      } else {
        this.playingIndex = 0
        this.stopVideo()
      }
    },
    previous() {
      this.song = resetSongModel()
      if (this.playingIndex > 0) {
        this.playingIndex--;
      } else {
        this.playingIndex = 0
        this.stopVideo()
      }
    },
    togglePlayer() {
      this.visible = !this.visible;
    },
    async toggleMute() {
      if (this.player) {
        const isMuted = await this.player.isMuted()
        if (isMuted) {
          this.player.unMute()
        } else {
          this.player.mute()
        }
        this.isMuted = !isMuted
      }
    },
    selectSong(index) {
      this.playingIndex = index
    },
    removeSong(index) {
      this.$store.dispatch('playlist/remove', this.songs[ index ])
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
      return this.$refs.youtube.player
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
  width: 400px;
  z-index: 100;

  .playlist {
    max-height: 150px;
    height: auto;
    overflow: scroll;
    text-align: left;
    padding: 10px;

    &.hidden {
      height: 0px;
      overflow: hidden;
      padding: 0px;
    }
  }

  .player {
    .col-8 {
      text-align: left;
    }
    .col-4 {
      text-align: right;
    }
  }
}

</style>
