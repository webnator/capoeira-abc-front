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
      <!-- <v-slide-group multiple show-arrows>
        <v-slide-item
          v-for="(category, index) of categories" :key="index"
          v-slot:default="{ active, toggle }"
        >
          <v-btn
            class="mx-2"
            :input-value="selectedCategories.includes(category)"
            ripple
            filter
            label
            @click="toggleCategory(category)"
          >
            {{ category }}
          </v-btn>
        </v-slide-item>
      </v-slide-group> -->
      <v-chip
        v-for="(category, index) of categories" :key="index"
        class="ma-2"
        :input-value="selectedCategories.includes(category)"
        ripple
        filter
        label
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

</style>
