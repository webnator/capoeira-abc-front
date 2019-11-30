<template class="amber">
  <div id="app">
    <router-view/>
    <Footer></Footer>
    <Player></Player>
  </div>
</template>

<script>

import Footer from '@/components/Footer'
import Player from '@/components/Player'

export default {
  name: 'App',
  components: {
    Footer,
    Player
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: var(--v-primary-base);

  .v-content {
    .container {
      padding-bottom: 50px;
    }
  }

  .title {
    display: inline-grid;
    text-transform: uppercase;
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
