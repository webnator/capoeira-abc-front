import Vue from 'vue'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

export function getCookie(name) {
  return VueCookies.get(name)
}
export function setCookie(name, val) {
  VueCookies.set(name, val)
}
