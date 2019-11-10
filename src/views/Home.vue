<template>
  <v-app id="app">  
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        Capo music
      </div>

      <v-spacer></v-spacer>

      <SongSearch></SongSearch>
      <v-spacer></v-spacer>
      
    </v-app-bar>
    <v-content>
        <CategoriesList 
          :categories="categories" 
          :isLoading="false"
          v-on:selected-categories="loadCategories($event)"
        ></CategoriesList>
        <SongList
          :songs="songs">
        </SongList>
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
      'categories'
    ])
  },
  methods: {
    loadCategories(categories) {
      this.$store.dispatch('songs/getSongs', { category: categories })
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
