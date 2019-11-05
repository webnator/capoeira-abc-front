<template>
  <div class="categories-list">
    <div v-if="loading">
      Loading...
    </div>
    <ul>
      <li v-for="(category, index) of categories" :key="index">
        {{ category }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CategoriesList',
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('songs/getCategories')
  },
  computed: {
    ...mapState('songs', [
      'categories'
    ]),
    loading() {
      return !this.categories || this.categories.length <= 0;
    }
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
