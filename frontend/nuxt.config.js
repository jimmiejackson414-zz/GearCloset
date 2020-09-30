export default {
  head: {
    titleTemplate: '%s - GearCloset',
    title: 'GearCloset',
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

  css: [
    '~/css/global.scss',
    '~/css/breakpoints.scss'
  ],

  plugins: [
    { src: '~/plugins/vue-unicons', mode: 'client' }
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa'
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
          primary: '#0077be', // water
          secondary: '#b7410e', // rust
          accent: '#e1ad01', // mustard
          info: '#759194', // stone
          warning: '#f05e23', // orange
          error: '#950714', // cranberry
          success: '#228b22', // forrest
          background: '#fff'
        },
        dark: {
          primary: '#0077be', // water
          secondary: '#b7410e', // rust
          accent: '#e1ad01', // mustard
          info: '#759194', // stone
          warning: '#f05e23', // orange
          error: '#950714', // cranberry
          success: '#228b22', // forrest
          background: '#252525'
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
