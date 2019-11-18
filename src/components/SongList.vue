<template>
  <div class="songs-list">
    <v-container>
      <v-row v-if="!songs || songs.length <= 0">
        No songs found :(
      </v-row>
      <v-row v-for="(song, index) of songs" :key="index" dense>
        <v-col cols="12">
          <v-card
            @click="selectSong(song.slug)"
            tile
          >
            <v-card-title>
              <div 
                v-bind:class="{ selected: song.slug === selectedSong.slug }"
              >
                <div>{{song.title}}</div>
              </div>
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
  props: { 
    songs: Array,
    selectedSong: {
      type: Object,
      default: () => ({}) 
    }
  },
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

.v-card.v-card--link.v-sheet.theme--light {
  border-bottom: 3px solid var(--v-secondary-lighten3);
  border-right: 3px solid var(--v-secondary-lighten3);
  cursor: pointer;

  .v-card__title {
    padding: 5px 0px 5px 16px;

    

    div.selected {
      display: inline-grid;
      
      &::before {
        content: "";
        width: calc(100% + 10px);
        background-color: var(--v-primary-base);
        display: block;
        height: 5px;
        margin-left: -5px;
        position: relative;
        top: 23px;
        z-index: 0;

         animation-name: slide;
        animation-duration: 0.5s;
      }

      @keyframes slide {
        0% { width: 0%; }
        100% { width: calc(100% + 10px); }
      }
      div {
        z-index: 1;  
      }
    }
  }
  .v-card__subtitle {
    padding: 5px 0px 5px 16px;
  }
}

</style>
