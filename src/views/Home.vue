<template>
  <div class="home">
    <CategoriesList></CategoriesList>
    <SongList></SongList>
  </div>
</template>

<script>
import CategoriesList from '@/components/CategoriesList'
import SongList from '@/components/SongList'

export default {
  name: 'home',
  components: {
    CategoriesList,
    SongList
  },
  created() {
    this.$store.dispatch('songs/getSongs')
  },
}
</script>
