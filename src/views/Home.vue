<template>
  <div class="home">
    <CategoriesList></CategoriesList>
  </div>
</template>

<script>
import CategoriesList from '@/components/CategoriesList'

export default {
  name: 'home',
  components: {
    CategoriesList
  }
}
</script>
