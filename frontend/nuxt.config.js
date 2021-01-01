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
  ** SSR Options
  */
  ssr: true,

  /*
   ** PublicRuntimeConfig Options
   */
  publicRuntimeConfig: {
    baseUrl: process.env.NUXT_ENV_API_URL || 'http://localhost:3000',
    apiUrl: process.env.NUXT_ENV_BACKEND_API_URL || 'http://localhost:8000/graphql',
    cloudinaryFolder: process.env.CLOUDINARY_FOLDER
  },

  /*
   ** PrivateRuntimeConfig (API Secrets, etc.)
   */
  privateRuntimeConfig: {
    nodeEnv: process.env.NODE_ENV || 'development'
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
    { src: '~/plugins/tiptap-vuetify', mode: 'client' },
    { src: '~/plugins/filters' }
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    'nuxt-graphql-request',
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/style-resources'
  ],

  /*
   ** Nuxt.js build modules
   */
  modules: [
    '@nuxtjs/cloudinary',
    '@nuxtjs/dayjs'
  ],

  /*
  ** GraphQL configuration
  */
  graphql: {
    endpoint: process.env.NUXT_ENV_BACKEND_API_URL,
    options: {
      credentials: 'include',
      mode: 'cors'
      // headers: {
      //   authorization: `Bearer ${token}`
      // }
    },
    useFetchPolyfill: true
  },

  /*
  ** Cloudinary module configuration
  */
  cloudinary: {
    cloudName: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    useComponent: true
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
          errorLight: '#db3030',
          errorDark: '#ce2424',

          info: '#adb5bd',
          success: '#137547',

          tertiary: '#2F2235',
          tertiaryLight: '#4b3654',
          tertiaryLightest: '#9a7aa9'
        }
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    // analyze: true,
    standalone: true,
    transpile: ['vee-validate/dist/rules'],
    externals: {
      moment: 'moment'
    }
    // extend (config, { isDev, isClient }) {
    //   config.module.rules.push({
    //     test: /\.(graphql|gql)$/,
    //     exclude: /node_modules/,
    //     loader: 'graphql-tag/loader'
    //   });
    // }
  }
};
