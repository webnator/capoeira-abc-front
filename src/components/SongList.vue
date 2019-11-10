<template>
  <div class="songs-list">

    <v-card v-for="(song, index) of songs" :key="index" class="mx-auto">
      <v-card-title>{{song.title}} </v-card-title>
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'SongsList',
  props: [ 'songs' ],
  data() {
    return { }
  }
}
</script>
<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
