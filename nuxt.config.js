// eslint-disable-next-line nuxt/no-cjs-in-config
const path = require('path')
const config = require('./appsettings.json')
const fastSassLoader = {
  loader: 'fast-sass-loader',
  options: {
    include: [path.resolve(__dirname, 'assets/scss')]
  }
}

function isVueRule (rule) {
  return rule.test.toString() === '/\\.vue$/'
}

function isSassRule (rule) {
  return ['/\\.sass$/', '/\\.scss$/'].includes(rule.test.toString())
}

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: config.AppSettings.SiteName,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'apple-mobile-web-app-title', content: 'tracuunnt' },
      { name: 'application-name', content: 'tracuunnt' },
      { name: 'google-site-verification', content: '1wb24bC9lwHscnGHVCcgwN__34MDraJciGj5-9QDGOg' },
      {
        property: 'fb:app_id',
        content: config.AppSettings.fbAppID
      },
      {
        property: 'og:site_name',
        content: config.AppSettings.SiteName
      },
     
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [],
    noscript: []
  },
  /**
   * Loading setting
   **/
  loading: {
    color: '#3366CC',
    height: '2px'
  },

  /*
   ** Load font local configuration
   ** See https://github.com/ivodolenc/nuxt-font-loader/
   */
  // fontLoader: {
  //   url: '/fonts/font.css'
  //   // preload: {
  //   //   hid: 'sandisplaypro'
  //   // }
  // },
  fontLoader: {
    url: 'https://fonts.googleapis.com/css?family=Roboto:wght@100;200;300;400;500;600;700;800&display=swap',
    prefetch: true,
    preconnect: true
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/i18n.js',
    '@/plugins/axios.js',
    '~/plugins/api.js',
    { src: '~/plugins/vue-awesome-swiper.js', mode: 'client' },
    { src: '~/plugins/vuelidate.js', ssr: false, mode: 'client' },
    { src: '~plugins/vue-debounce.js', ssr: false },
    { src: '~plugins/paginate', ssr: false, mode: 'client' },
    { src: '~/plugins/vuex-cache.js', ssr: false }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    '@nuxtjs/style-resources',
    '@nuxtjs/dayjs',
    [
      'nuxt-i18n',
      {
        seo: true,
        lazy: true,
        locales: [
          {
            name: 'Vietnamese',
            src: 'flag/vietnam.png',
            code: 'vi',
            iso: 'vi-VN',
            file: 'vi-VN.js'
          }
        ],
        langDir: 'lang/',
        defaultLocale: 'vi'
      }
    ],
    // https://github.com/wemake-services/nuxt-imagemin
    // [
    //   'nuxt-imagemin',
    //   { optipng: { optimizationLevel: 6 }, gifsicle: { optimizationLevel: 2 } }
    // ],
    '@nuxtjs/toast',
    [
      'nuxt-lazy-load',
      {
        images: true,
        videos: true,
        audios: false,
        iframes: false,
        defaultImage: '/images/loading.png',
        loadingClass: 'isLoading',
        loadedClass: 'isLoaded',
        appendClass: 'lazyLoad'
      }
    ]
  ],
  dayjs: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi'
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/style.scss', '@/assets/font-awesome/css/font-awesome.min.css', 'swiper/swiper-bundle.css'],

  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    'nuxt-font-loader',
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    // '@nuxtjs/stylelint-module',
    ['@nuxtjs/dotenv', { filename: '.env.development' }]
    // https://github.com/Developmint/nuxt-purgecss
    // 'nuxt-purgecss'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_URL
    // proxy: true
  },
  // proxy: {
  //   '/api/': process.env.API_URL
  // },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** Global SCSS
   ** https://github.com/nuxt-community/style-resources-module
   */
  styleResources: {
    scss: [
      '~assets/scss/commons/_variables.scss',
      '~assets/scss/commons/_mixins.scss'
    ]
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    // cache: process.env.NODE_ENV === 'production',
    // extractCSS: process.env.NODE_ENV === 'production',
    // optimizeCSS: process.env.NODE_ENV === 'production',
    loaders: {
      vue: {
        prettify: false
      }
    },
    /*
     ** You can extend webpack config here
     */
    vendor: ['vuelidate'],
    // extractCSS: true,
    // extractCSS: {
    //   ignoreOrder: true
    // },
    extend (config, { ctx, isDev, isClient, loaders: { vue } }) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
      // if (isClient) {
      //   // config.devtool = '#source-map'
      //   vue.transformAssetUrls.img = ['data-src', 'src']
      //   vue.transformAssetUrls.source = ['data-srcset', 'srcset']
      //   // config.devtool = 'source-map'
      // }

      config.module.rules.forEach((rule) => {
        if (isVueRule(rule)) {
          rule.options.loaders.sass.push(fastSassLoader)
          rule.options.loaders.scss.push(fastSassLoader)
        }

        if (isSassRule(rule)) {
          rule.use.push(fastSassLoader)
        }
      })
    }
  },
  // https://www.npmjs.com/package/@nuxtjs/toast
  toast: {
    position: 'bottom-left',
    duration: 3000,
    register: [
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  }
}
