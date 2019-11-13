<template>
  <v-app id="app">
    <v-app-bar app color="primary" elevation="0" dark>
      <div class="d-flex align-center">
        Capo music
      </div>

      <v-spacer></v-spacer>

      <SongSearch
        @search-terms="findByTerms($event)"
      ></SongSearch>
      <v-spacer></v-spacer>

    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-row no-gutters>
          <v-col>

            <CategoriesList
              :categories="categories"
              :isLoading="false"
              @selected-categories="loadCategories($event)"
            ></CategoriesList>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <SongList
              :songs="songs"
              @song-selected="loadSong($event)">
            </SongList>
          </v-col>
          <v-col>
            <div v-if="displaySong">
                Title: {{ displaySong.title }} <br/>
                Lyrics: <span style="white-space: pre-line" v-html="displaySong.lyrics"></span>
            </div>
            <div v-else>
              Loading...
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import CategoriesList from '@/components/CategoriesList'
import SongList from '@/components/SongList'
import SongSearch from '@/components/SongSearch'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    CategoriesList,
    SongList,
    SongSearch
  },
  created() {
    this.$store.dispatch('songs/getCategories')
    this.$store.dispatch('songs/getSongs')

  },
  data() {
    return {
      songList: [],
      isLoading: false,
      search: null
    }
  },
  computed: {
    ...mapState('songs', [
      'songs',
      'categories',
      'displaySong'
    ])
  },
  methods: {
    loadCategories(categories) {
      this.$store.dispatch('songs/getSongs', { category: categories })
    },
    loadSong(song) {
      this.$store.dispatch('songs/setSong', song)
    },
    findByTerms({ search, slug }) {
      if (slug) {
        this.$store.dispatch('songs/getSong', slug)
      } else {
        this.$store.dispatch('songs/getSongs', { search })
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
