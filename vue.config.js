module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: "/vue-front",
  outputDir: "docs",

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
