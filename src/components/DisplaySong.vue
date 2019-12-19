<template>
  <div id="display-song">
    <div v-if="song">
      <v-row class="header" no-gutters>
        <v-col>
          <div class="title font-weight-black">
            <span>{{ song.title }}</span>
          </div>
          <v-btn v-if="hasMedia" icon large @click="addToPlaylist">
            <v-icon dark>mdi-music-note-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      
      <div class="divider"></div>
      <div class="lyrics">
        <span style="white-space: pre-line" v-html="song.lyrics"></span>
      </div>
    </div>
    <div v-else v-t="'loading'"/>
    <v-snackbar
      v-model="added"
      :bottom="true"
      :timeout="2000"
    >
      <span v-t="'added_playlist'"/>
      <v-btn text dark @click="snackbar = false" v-t="'close'"/>
    </v-snackbar>
  </div>
</template>

<script>

export default {
  name: 'DisplaySong',
  props: [ 'song' ],
  data() {
    return {
      added: false
    }
  },
  methods: {
    addToPlaylist() {
      this.$emit('playlist-added', this.song)
      this.added = true
    }
  },
  computed: {
    hasMedia() {
      return this.song.media && this.song.media.videoLink && this.song.media.videoLink !== ''
    }
  }
}
</script>
<style scoped lang="scss">

#display-song {
  text-align: left;

  .divider {
    width: 70%;
    margin-left: 0%;
    background-color: var(--v-secondary-base);
    height: 2px;
    display: block;
  }

  .lyrics {
    text-align: center;
    span::selection {
      background-color: var(--v-accent-base);
    }
  }

  .header {
    .v-btn {
      vertical-align: bottom;
      margin-left: 15px;
      color:var(--v-accent-secondary);
    }
  }
}

</style>
