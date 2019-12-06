import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { getCookie, setCookie } from './cookies'

Vue.use(VueI18n)

let localeMessages;

const myVueI18n = new VueI18n({
  locale: defaultLocale(),
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})

function loadLocaleMessages () {
  if (!localeMessages) {
    const locales = require.context('./../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
    const messages = {}
    locales.keys().forEach(key => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i)
      if (matched && matched.length > 1) {
        const locale = matched[1]
        messages[locale] = locales(key)
      }
    })
    localeMessages = messages;
  }
  return localeMessages;
}

function defaultLocale() {
  const cookieLang = getCookie('cm-locale')
  if (cookieLang && isLanguageValid(cookieLang)) {
    return cookieLang
  }
  const navigatorLang = navigator.language.split('-')[0]
  if (navigatorLang && isLanguageValid(navigatorLang)) {
    return navigatorLang
  }
  return 'en'
}

function isLanguageValid(lang) {
  return Object.keys(loadLocaleMessages()).includes(lang)
}

export default myVueI18n

export function setLocale(lang) {
  if (lang && isLanguageValid(lang.toLowerCase())) {
    myVueI18n.locale = lang.toLowerCase()
    setCookie('cm-locale', lang.toLowerCase())
  }
}
