<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
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
