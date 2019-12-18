<template>
  <v-app>
    <v-app-bar app color="primary" flat tile dark>
      <v-avatar class="logo-container elevation-6 py-2">
        <v-img
          src="../assets/logo-blanco.png"
          class=""
          contain>
        </v-img>
      </v-avatar>

      <v-spacer></v-spacer>

      <SongSearch
        @search-terms="findByTerms($event)"
      ></SongSearch>

      <v-spacer></v-spacer>
      <SideMenu></SideMenu>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-row>
          <div class="divider">
            <span class="horizontal">
              <span></span>
              <span></span>
            </span>
            <span class="vertical">
              <span class="vertical-child"></span>
              <span class="vertical-child"></span>
              <span class="horizontal">
                <span></span>
                <span></span>
              </span>
            </span>

          </div>
        </v-row>
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
              :selected-song="displaySong"
              @song-selected="loadSong($event)">
            </SongList>
          </v-col>
          <v-col>
            <display-song
              :song="displaySong"
              @playlist-added="addToPlaylist"/>
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
import DisplaySong from '@/components/DisplaySong'
import SideMenu from '@/components/SideMenu'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    CategoriesList,
    SongList,
    SongSearch,
    DisplaySong,
    SideMenu
  },
  created() {
    this.$store.dispatch('songs/getCategories')
    this.$store.dispatch('songs/getSongs')
    if (this.$route.params.slug) {
      this.$store.dispatch('songs/getSong', this.$route.params.slug)
    }
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
    loadSong(slug) {
      this.$router.push({ name: 'home', params: { slug } })
      // this.$store.dispatch('songs/setSong', slug)
    },
    findByTerms({ search, slug }) {
      if (slug) {
        this.$store.dispatch('songs/getSong', slug)
      } else {
        this.$store.dispatch('songs/getSongs', { search })
      }
    },
    addToPlaylist(song) {
      this.$store.dispatch('playlist/add', song)
    }
  },
  watch: {
    $route(to) {
      this.$store.dispatch('songs/getSong', to.params.slug)
    }
  }
}
</script>

<style lang="scss">
.logo-container {
  background-color: var(--v-secondary-base);
  height: 84px !important;
  min-width: 48px;
  width: 12% !important;
  max-width: 150px !important;
  margin-top: 20px;
  margin-left: 2%;
  border-radius: 0px 0px 10px 10px;
}

.divider {
  width: 100%;
  margin: 20px 0;
  span {
    display: block;
  }
  .horizontal {
    span {
      background-image: url('../assets/corda.png');
      width: 100%;
      height: 6px;
      margin-top: 2px;
      background-repeat: repeat-x;
      background-size: 100px 6px;
      &:first-of-type {
        background-position: 13px;
      }
    }
  }
  .vertical {
    position: absolute;
    right: 15px;
    height: 50vh;
    background-color: var(--v-primary-base);
    margin-top: -18px;
    span.vertical-child {
      background-image: url('../assets/corda.png');
      background-repeat: repeat-y;
      background-size: 14px 16px;
      width: 6px;
      height: inherit;
      right: 10px;
      margin-right: 3px;
      display: inline-block;
      margin-left: 1.5px;
      margin-right: 1.5px;
      &::after {
        content: "";
        background-image: url('../assets/corda-final.png');
        height: 40px;
        width: 17px;
        display: block;
        position: absolute;
        bottom: -38px;
        background-size: 57%;
        background-repeat: no-repeat;
        margin-left: -2px;
      }

    }
    .horizontal {
      position: absolute;
      top: 14px;
      width: 23px;
      margin-left: -3px;
      background-color: var(--v-primary-base);
    }

  }
}

</style>
