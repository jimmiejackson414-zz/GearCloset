export default {
  head: {
    titleTemplate: '%s | Gear Closet',
    title: 'Gear Closet',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
      { hid: 'description', name: 'description', content: '' },
      {
        hid: 'description',
        name: 'description',
        content: 'Gear Closet - Plan hikes with your friends!'
      },
      { 'http-equiv': 'Accept-CH', content: 'DPR, Viewport-Width, Width' }
    ]
  },

  env: {
    baseUrl: process.env.VUE_APP_API_URL || 'http://localhost:3000'
  },

  css: [
    '~/css/global.scss'
  ],

  plugins: [
    { src: '~/plugins/vue-unicons', mode: 'client' },
    { src: '~/plugins/v-mask', mode: 'client' },
    { src: '~/plugins/apex-charts', mode: 'client' },
    { src: '~/plugins/filters' }
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/style-resources'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    '@nuxtjs/dayjs'
  ],

  pwa: {
    icon: {
      fileName: 'icon.png',
      source: './static/icon.png',
      sizes: [64, 120, 144, 152, 192, 384, 512]
    }
  },

  auth: {
    strategies: {
      'laravel.passport': {
        url: '',
        client_id: '',
        client_secret: ''
      }
    }
  },

  axios: {},

  dayjs: {
    locales: ['en'],
    defaultLocale: 'en',
    plugins: []

  },

  styleResources: {
    scss: ['./css/_colors.scss', '~/css/_breakpoints.scss', '~/css/_defaults.scss']
  },

  vuetify: {
    customVariables: ['~/css/variables.scss'],
    treeShake: true,
    icons: {
      iconfont: 'vue-unicons'
    },
    theme: {
      options: {
        customProperties: true
      },
      themes: {
        light: {
          grey10: '#21242a',
          grey9: '#343a40',
          grey8: '#494f57',
          grey7: '#868e95',
          grey6: '#adb5bd',
          grey5: '#cfd4da',
          grey4: '#dee2e6',
          grey3: '#e9ecee',
          grey2: '#f0f3f5',
          grey1: '#f8f9fa',

          primary: '#2368a2',
          primaryDark: '#1a4971',
          primaryLight: '#aad3f5',

          secondary: '#1a645d',
          secondaryLight: '#6ed7d3',

          accent: '#74d99f',
          accentDark: '#4cce83',
          accentDarkest: '#32b56a',

          warning: '#fae19f',
          warningDark: '#8c6c20',
          warningDarkest: '#5b4712',
          warningLight: '#fae19f',
          warningLightest: '#fffcf4',

          error: '#db3030',
          errorDark: '#ce2424',

          info: '#adb5bd',
          success: '#137547'
        }
      }
    }
  },

  build: {
    standalone: true,
    extend (config, { isDev, isClient }) {
      // Run ESLint on save
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};
