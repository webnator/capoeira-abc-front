<template>
  <v-footer fixed id="footer">
    <v-card
      class="flex"
      flat
      tile
      dense
    >
      <v-card-text>
        <span>
          {{ new Date().getFullYear() }} — <strong>ABC Capoeira</strong> — <router-link to="/contact" v-t="'contact'"/>
        </span>
      </v-card-text>
    </v-card>

  </v-footer>
</template>

<script>

export default {
  name: 'Footer',
  data() {
    return { }
  }
}
</script>
<style scoped lang="scss">

#footer {
  margin: 10px;
  .v-card {
    .v-card__text {
      text-align: left;
      padding: 0;
    }
  }
}

</style>
