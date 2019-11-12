<template>
  <v-autocomplete
    placeholder="Search"
    :items="songList"
    item-text="title"
    item-value="slug"
    :append-icon="null"
    append-outer-icon="mdi-magnify"
    prepend-icon="mdi-music-clef-treble"
    :clearable="true"
    :hide-no-data="true"
    :loading="loadingColor"
    :search-input.sync="search"
    :no-filter="true"

    @change="getSongsBySlug($event)"
    @keyup.enter="getSongsByKeyword()"
    @click:append-outer="getSongsByKeyword()"
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

import musicApi from './../api/music-api'

export default {
  name: 'SongSearch',
  props: {
    filler: {
      type: String,
      default: '...'
    },
    hintSize: {
      type: Number,
      default: 50
    },
    searchLimit: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      songList: [],
      isLoading: false,
      search: null
    }
  },
  methods: {
    getSongsByKeyword () {
      if (this.isLoading) {
        return
      }
      this.$emit('search-terms', { search: this.search })
    },
    getSongsBySlug (event) {
      this.isLoading = true
      this.$emit('search-terms', { slug: event })
      this.isLoading = false
    },
    lyricsExtract (lyrics) {
      if (!lyrics || !this.search) {
        return lyrics;
      }

      const cleanLyrics = lyrics.replace(/(\r\n|\n|\r)/gm, '').replace(/\s\s+/g, ' ').toLowerCase()
      const foundIndex = cleanLyrics.indexOf(this.search.toLowerCase())

      let extract;
      if (foundIndex >= 0) {
        const middle = Math.floor(( this.hintSize - this.search.length) / 2) - this.filler.length
        const lowerLimit = foundIndex - middle
        const upperLimit = foundIndex + this.search.length + middle
        const lyricsFoundSection = lyrics.substring(lowerLimit, upperLimit)
        extract = `${this.filler}${lyricsFoundSection}${this.filler}`
      } else {
        extract = `${lyrics.substring(0, (this.hintSize - this.filler.length))}${this.filler}`
      }

      return extract
    }
  },
  computed: {
    loadingColor() {
      return this.isLoading ? 'secondary' : false
    }
  },
  watch: {
    async search (val) {
      if (this.isLoading) {
        return
      }
      this.isLoading = true

      try {
        const response = await musicApi.getSongs({ search: val })
        this.songList = response.slice(0, this.searchLimit)
      } catch (err) {
        console.log(err)
      }

      this.isLoading = false
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
