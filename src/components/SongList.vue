<template>
  <div class="songs-list">
    <v-container>
      <v-row v-if="!songs || songs.length <= 0">
        No songs found :(
      </v-row>
      <v-row v-for="(song, index) of songs" :key="index" dense>
        <v-col cols="12">
          <v-card @click="selectSong(song.slug)">
            <v-card-title>
              {{song.title}}
            </v-card-title>
            <v-card-subtitle class="italic">
              {{song.category.join(', ')}}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'SongsList',
  props: [ 'songs' ],
  data() {
    return { }
  },
  methods: {
    selectSong(slug) {
      this.$emit('song-selected', slug)
    }
  }
}
</script>
<style scoped lang="scss">
.songs-list {
  text-align: left;
}
.italic {
  font-size: 90%;
  font-style: italic;
}
</style>
