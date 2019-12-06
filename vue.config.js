module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: "/capo-app",
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
