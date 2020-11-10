module.exports = {
  telemetry: false,
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 5000
  },
  serverMiddleware: [],
  head: {
    title: 'Onboarding',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  components: true,
  loading: '~/components/icons/loading.vue',
  loadingIndicator: '@/static/loading.html',
  css: [
    '@/assets/theme.scss',
    '@/assets/transitions.scss'
  ],
  plugins: [],
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/cloudinary'
  ],
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    icons: true
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_SECRET,
    apiSecret: process.env.CLOUDINARY_KEY,
    useComponent: true
  },
  axios: {
    browserBaseURL: `//${process.env.BROWSER_URL}`
  },
  googleAnalytics: {
    id: process.env.GA_PROPERTY,
    debug: {
      enabled: false,
      sendHitTask: true
    }
  },
  build: {
    extend (config, ctx) {
      // show correct line numbers in browser console
      if (ctx.isDev) {
        config.devtool = ctx.isClient
          ? 'source-map'
          : 'inline-source-map'
      }
    }
  }
}
