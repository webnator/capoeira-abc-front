module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: "/capoeira-abc-front",
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
