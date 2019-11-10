<template>
  <v-autocomplete
    placeholder="Search"
    :items="songList"
    item-text="title"
    item-value="slug"
    append-outer-icon="mdi-magnify"
    prepend-icon="mdi-music-clef-treble"
    :clearable="true"
    :dense="true"
    :hide-no-data="true"
    :loading="isLoading"
    :search-input.sync="search"
    :no-filter="true"
  >
    <template v-slot:item="data">
      <template>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.title"></v-list-item-title>
          <v-list-item-subtitle v-html="lyricsExtract(data.item.lyrics)"></v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SongSearch',
  // props: [ 'songs' ],
  data() {
    return {
      songList: [],
      isLoading: false,
      search: null
    }
  },
  methods: {
    lyricsExtract(lyrics) {
      const FILLER = '...'
      const SIZE = 50
      if (!lyrics || !this.search) {
        return lyrics;
      }

      const cleanLyrics = lyrics.replace(/(\r\n|\n|\r)/gm, '').replace(/\s\s+/g, ' ').toLowerCase()
      const foundIndex = cleanLyrics.indexOf(this.search.toLowerCase())
      if (foundIndex >= 0) {
        const middle = Math.floor(( SIZE - this.search.length) / 2) - FILLER.length
        const lowerLimit = foundIndex - middle
        const upperLimit = foundIndex + this.search.length + middle
        const lyricsFoundSection = lyrics.substring(lowerLimit, upperLimit)
        return `${FILLER}${lyricsFoundSection}${FILLER}`
      }
      console.log(`${lyrics.substring(0, (SIZE - FILLER.length))}${FILLER}`)
      return `${lyrics.substring(0, (SIZE - FILLER.length))}${FILLER}`;
    }
  },
  watch: {
    search (val) {
      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      // Lazily load input items
      axios.get('http://localhost:8081/api/v1/songs', { params: { search: val } })
        .then(res => {
          this.songList = res.data
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
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
