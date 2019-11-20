<template>
  <div id="display-song">
    <div v-if="song">
      <v-row no-gutters>
        <v-col>
          <div class="title font-weight-black">
            <span>{{ song.title.toUpperCase() }}</span>
          </div>
        </v-col>
        <v-col>
          <v-btn v-if="hasMedia" class="mx-2" tile small @click="addToPlaylist">
            <v-icon dark>mdi-playlist-music</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      
      <div class="divider"></div>
      <div class="lyrics">
        <span style="white-space: pre-line" v-html="song.lyrics"></span>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>

export default {
  name: 'DisplaySong',
  props: [ 'song' ],
  data() {
    return {
      
    }
  },
  methods: {
    addToPlaylist() {
      this.$emit('playlist-added', this.song)
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
  }

  .title {
    display: inline-grid;
    
    &::before {
      content: "";
      width: calc(100% + 20px);
      background-color: var(--v-accent-base);
      display: block;
      height: 15px;
      margin-left: -10px;
      position: relative;
      top: 26px;
      z-index: 0;
    }
    span {
      z-index: 1;  
    }
  }
}

</style>
