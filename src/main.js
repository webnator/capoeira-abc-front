import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueYoutube from 'vue-youtube'
import i18n from './i18n'

Vue.use(VueYoutube)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: function (h) { return h(App) }
}).$mount('#app')
