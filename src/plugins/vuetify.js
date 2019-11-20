import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import lightTheme from './theme';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: lightTheme
    },
    options: {
      customProperties: true,
    }
  }
});
