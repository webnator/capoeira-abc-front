<!-- <template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <CategoriesList></CategoriesList>
    </v-content>
  </v-app>
</template>

<script>
import CategoriesList from './components/CategoriesList';

export default {
  name: 'App',

  components: {
    CategoriesList,
  },

  data: () => ({
    //
  }),
};
</script> -->






<template>
   <v-app id="app">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        Capo music
      </div>

      <v-spacer></v-spacer>

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
      ></v-autocomplete>

      <!-- :loading="isLoading"
        :search-input.sync="search" -->

      <v-spacer></v-spacer>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>

  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      songList: [],
      isLoading: false,
      search: null
    }
  },
  computed: {
    ...mapState('songs', [
      'songs'
    ])
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
