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

  /*
   ** PrivateRuntimeConfig (API Secrets, etc.)
   */
  publicRuntimeConfig: {
    baseUrl: process.env.NUXT_ENV_API_URL || 'http://localhost:3000',
    apiUrl: process.env.NUXT_ENV_BACKEND_API_URL || 'http://localhost:8000/graphql'
  },

  /*
   ** PrivateRuntimeConfig (API Secrets, etc.)
   */
  privateRuntimeConfig: {

  },

  /*
   ** Global CSS
   */
  css: [
    '~/css/global.scss'
  ],

  /*
   ** Plugins to load before mounting the App
   ** Icons can be found at https://antonreshetov.github.io/vue-unicons/
   */
  plugins: [
    { src: '~/plugins/vue-unicons', mode: 'client' },
    { src: '~/plugins/v-mask', mode: 'client' },
    { src: '~/plugins/apex-charts', mode: 'client' },
    { src: '~/plugins/tiptap-vuetify', mode: 'client' },
    { src: '~/plugins/filters' }
  ],

  components: true,

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/style-resources'
  ],

  /*
   ** Nuxt.js build modules
   */
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/dayjs',
    '@nuxtjs/pwa'
  ],

  /*
  ** Apollo module configuration
  */
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.NUXT_ENV_BACKEND_API_URL
      }
    },
    defaultOptions: {
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'network-only'
      }
    },
    cookieAttributes: {
      expires: 7 // optional, default 7 days
    }
  },

  /*
   ** Progressive Web App configuration
   */
  pwa: {
    icon: {
      fileName: 'icon.png',
      source: './static/icon.png',
      sizes: [64, 120, 144, 152, 192, 384, 512]
    }
  },

  /*
  ** Dayjs module configuration
  */
  dayjs: {
    locales: ['en'],
    defaultLocale: 'en',
    plugins: []

  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#2368a2',
    height: '5px',
    failedColor: '#db3030'
  },

  /*
  ** Enable global scss variables
  */
  styleResources: {
    scss: ['./css/_colors.scss', '~/css/_breakpoints.scss', '~/css/_defaults.scss']
  },

  /*
   ** Vuetify configuration
   */
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
          warningDark: '#F7D26F',
          warningDarkest: '#5b4712',
          warningLight: '#FDF0CF',
          warningLightest: '#FEF8E8',

          error: '#db3030',
          errorDark: '#ce2424',

          info: '#adb5bd',
          success: '#137547'
        }
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    standalone: true,
    transpile: ['vee-validate/dist/rules'],
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
