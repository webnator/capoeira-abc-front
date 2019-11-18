<template>
  <div id="display-song">
    <div v-if="song">
      <div class="title font-weight-black">
        <span>{{ song.title.toUpperCase() }}</span>
      </div>
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
