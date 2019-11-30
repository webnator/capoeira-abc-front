<template>
  <div class="side-menu" v-bind:class="{ shown }">
    <div class="btn-container">
      <v-list>
        <v-list-item-group>
          <v-list-item @click="navigate('home')">
            Home
          </v-list-item>
          <v-list-item @click="navigate('about')">
            About
          </v-list-item>
          <v-list-item @click="navigate('contact')">
            Contact
          </v-list-item>
        </v-list-item-group>
        <v-divider></v-divider>
        <v-list-item-group>
          <v-btn 
            v-for="(lang, index) of langs" :key="index"
            text small 
            @click="chooseLang(lang)"
            :class="{ active: currentLang === lang }">
            {{ lang }}
          </v-btn>
        </v-list-item-group>
      </v-list>
      
    </div>
    <v-btn icon x-large @click="toggleShow">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </div>
</template>

<script>

export default {
  name: 'SideMenu',
  data() {
    return {
      shown: false
    }
  },
  computed: {
    langs() {
      return Object.keys(this.$i18n.messages)
    },
    currentLang() {
      return this.$i18n.locale
    }
  },
  methods: {
    toggleShow() {
      this.shown = !this.shown
    },
    navigate(route) {
      this.$router.push(route)
      this.shown = false
    },
    chooseLang(lang) {
      this.$i18n.locale = lang;
    }
  }
}
</script>
<style scoped lang="scss">

.side-menu {
  a {
    text-decoration: none;
    color: var(--v-accent-base);
  }
  &.shown {
    .btn-container {
      display: block !important;
    }
    i.v-icon {
      color: var(--v-accent-base) !important;
    }
  }
  .btn-container {
    position: absolute;
    top: 0px;
    right: 0px;
    text-transform: uppercase;
    display: none;

    .v-list {
      padding: 20px;
      padding-right: 80px;
      border-radius: 0px;
    }
  }
  button.v-btn {
    i.v-icon {
      color: var(--v-secondary-base);
    }
  }
  .v-item-group {
    button {
      margin-top: 10px;
      margin-right: 10px;
      background-color: transparent;

      &.active {
        background-color: var(--v-accent-base);
        color: var(--v-primary-darken2);
      }
    }
  }
}

</style>
