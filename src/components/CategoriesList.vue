<template>
  <div class="categories-list">

    <v-row v-if="isLoading" :align="'center'">
      <v-col><v-skeleton-loader ref="skeleton" :type="'chip'" class="mx-auto"></v-skeleton-loader></v-col>
      <v-col><v-skeleton-loader ref="skeleton" :type="'chip'" class="mx-auto"></v-skeleton-loader></v-col>
      <v-col><v-skeleton-loader ref="skeleton" :type="'chip'" class="mx-auto"></v-skeleton-loader></v-col>
      <v-col><v-skeleton-loader ref="skeleton" :type="'chip'" class="mx-auto"></v-skeleton-loader></v-col>
      <v-col><v-skeleton-loader ref="skeleton" :type="'chip'" class="mx-auto"></v-skeleton-loader></v-col>
    </v-row>

    <div v-else>
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
  </div>
</template>

<script>

export default {
  name: 'CategoriesList',
  props: [ 'categories', 'isLoading' ],
  data() {
    return {
      selectedCategories: []
    }
  },
  methods: {
    toggleCategory(category) {
      if (this.selectedCategories.indexOf(category) >= 0) {
        this.selectedCategories.splice(this.selectedCategories.indexOf(category), 1)
      } else {
        this.selectedCategories.push(category)
      }
      this.$emit('selected-categories', this.selectedCategories)
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
