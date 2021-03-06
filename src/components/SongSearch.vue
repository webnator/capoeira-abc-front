<template>
  <span id="song-search">
    <v-autocomplete
      color="secondary"
      :label="$t('search')"
      append-icon="mdi-magnify"
      prepend-inner-icon="mdi-music-clef-treble"
      :filled="true"
      :dense="true"

      attach="#song-search-results"

      :items="songList"
      item-text="title"
      item-value="slug"
      :clearable="true"
      :hide-no-data="true"

      :loading="isLoading"
      :search-input.sync="search"
      :no-filter="true"

      @change="getSongsBySlug($event)"
      @keyup.enter="getSongsByKeyword()"
      @click:append-outer="getSongsByKeyword()"
    >
      <template v-slot:item="data">
        <v-list-item-content>
          <v-list-item-title v-html="data.item.title"></v-list-item-title>
          <v-list-item-subtitle v-html="lyricsExtract(data.item.lyrics)"></v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </v-autocomplete>
    <div id="song-search-results"></div>
  </span>
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
<style lang="scss">

#song-search {
  align-items: flex-start;
  display: flex;
  flex: 1 1 auto;
  padding: 35px 0 0 0;
  color: var(--v-secondary-base);

  .v-text-field--filled > .v-input__control > .v-input__slot {
    border-radius: 0;
    background-color: var(--v-accent-base);
    color: var(--v-secondary-base);
    border: 4px solid var(--v-secondary-base) !important;
  }
  .v-icon.theme--dark, .v-label.v-label--active.theme--dark, .v-label.theme--dark {
    color: var(--v-secondary-base);
  }

  .v-select__slot {
    input {
      color: var(--v-secondary-base);
    }
  }

  .v-input__append-inner:last-of-type {
    background:var(--v-secondary-base);
    cursor: pointer;
    height: 102%;
    margin-top: 0px;
    margin-right: -12px;
    width: 50px;

    .v-input__icon.v-input__icon--append {
      align-self: center;
      .v-icon.theme--dark {
        transform: rotate(0deg);
        color: var(--v-accent-base) !important;
      }
    }
  }

  #song-search-results {
    position: absolute;

    .theme--light.v-list-item {
      border-bottom: 2px solid var(--v-secondary-base);
      &:last-child {
        border-bottom: 0px;
      }
    }

    .theme--light.v-list {
      background-color: var(--v-accent-base);
      opacity: 0.95;
    }
    .theme--light.v-select-list.v-card {
      background-color: transparent;
    }
  }
}


</style>
