<template>
  <div class="categories-list">

    <v-row v-if="loading" :align="'center'">
      <v-col><v-skeleton-loader ref="skeleton" :type="'chip'" class="mx-auto"></v-skeleton-loader></v-col>
      <v-col><v-skeleton-loader ref="skeleton" :type="'chip'" class="mx-auto"></v-skeleton-loader></v-col>
      <v-col><v-skeleton-loader ref="skeleton" :type="'chip'" class="mx-auto"></v-skeleton-loader></v-col>
      <v-col><v-skeleton-loader ref="skeleton" :type="'chip'" class="mx-auto"></v-skeleton-loader></v-col>
      <v-col><v-skeleton-loader ref="skeleton" :type="'chip'" class="mx-auto"></v-skeleton-loader></v-col>
    </v-row>

    <v-chip
      v-for="(category, index) of categories" :key="index"
      class="ma-2"
      :input-value="selectedCategories.includes(category)"
      outlined
      ripple
      filter
      @click="toggleCategory(category)"
    >
      {{ category }}
    </v-chip>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CategoriesList',
  data() {
    return {
      selectedCategories: []
    }
  },
  created() {
    this.$store.dispatch('songs/getCategories')
  },
  methods: {
    toggleCategory(category) {
      if (this.selectedCategories.indexOf(category) >= 0) {
        this.selectedCategories.splice(this.selectedCategories.indexOf(category), 1)
      } else {
        this.selectedCategories.push(category)
      }
      this.$store.dispatch('songs/getSongs', { category: this.selectedCategories })
    }
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
