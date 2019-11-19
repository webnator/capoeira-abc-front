<template>
  <div id="player">

    <button @click="playVideo">play</button>
    <div id="video-player">
      <youtube
        ref="youtube"
        :video-id="videoId"
        :player-vars="playerVars"
        @ended="nextVideo"
        @cued="playVideo"
      ></youtube>
    </div>


  </div>
</template>

<script>

export default {
  name: 'Player',
  data() {
    return {
      playingIndex: null,
      urls: [
        'https://www.youtube.com/watch?v=OgTyLu_EmIo',
        'https://www.youtube.com/watch?v=SsjIsOi2Ybw',
        'https://www.youtube.com/watch?v=imb4EHuQyF4'
      ],
      playerVars: {
        autoplay: 0
      }
    }
  },
  mounted() {
    this.playingIndex = 0
  },
  methods: {
    getIdFromUrl(url) {
      return this.$youtube.getIdFromUrl(url)
    },
     playVideo() {
      this.player.playVideo()
    },
    nextVideo() {
      if (this.playingIndex < (this.urls.length - 1)) {
        this.playingIndex++;
      }
    }
  },
  computed: {
    videoId() {
      return this.getIdFromUrl(this.urls[ this.playingIndex ])
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
  width: 800px;
  height: 600px;
  z-index: 100;
}

</style>
