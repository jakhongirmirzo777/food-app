import axios from 'axios'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Mega waffle | mega-waffle.uz',
    htmlAttrs: {
      lang: 'uz',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          "Mega vaflida salqinlaning va chanqog'ingizni qondiring:  judaham mazali muzqaymoq va ichimliklar makoni!",
      },
      {
        hid: 'image',
        name: 'image',
        content: '/logo_1200x630.jpg',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Mega waffle | mega-waffle.uz',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          "Mega vaflida salqinlaning va chanqog'ingizni qondiring:  judaham mazali muzqaymoq va ichimliklar makoni!",
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/logo_1200x630.jpg',
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'Mega waffle | mega-waffle.uz',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:locale',
        property: 'og:locale',
        content: 'uz_UZ',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'mega-coffe.uz',
      },
      { hid: 'og:url', property: 'og:url', content: 'https://mega-waffle.uz/' },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:domain',
        property: 'twitter:domain',
        content: 'mega-waffle.uz',
      },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://mega-waffle.uz/',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Mega waffle | mega-waffle.uz',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          "Mega vaflida salqinlaning va chanqog'ingizni qondiring:  judaham mazali muzqaymoq va ichimliklar makoni!",
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: '/logo_1200x630.jpg',
      },
      {
        hid: 'keywords',
        property: 'keywords',
        content:
          'mega, mega andijan, cofe, coffee, kokteyl, kakteyl, marojna, muzqaymoq, pizza, pitsa, fast food, lavash, gamburger, hot dog, moxito, mohito, suv, ichimlik, taomlar, yegulik, food, restaraunt, cafe, restaran, kafe, mega waffle, mefa coffee, mega vafli, mega kofe, mega-waffle.uz, mega waffle uz',
      },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'robots', name: 'robots', content: 'index, follow' },
      { hid: 'yandex', name: 'yandex', content: 'noindex, follow' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/styles/index.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vee-validate.js', ssr: false },
    { src: '@/plugins/v-mask.js', ssr: false },
    { src: '@/plugins/filters.js', ssr: true },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/svg',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/sitemap',
    '@nuxtjs/axios',
    ['nuxt-lazy-load', { defaultImage: '/default.jpg' }],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_BASE_URL,
  },

  server: {
    host: '0',
    port: 3000,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  sitemap: {
    hostname: process.env.APP_BASE_URL,
    gzip: true,
    trailingSlash: true,
    exclude: ['/error'],
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date(),
    },
    routes: async () => {
      const { data } = await axios.get(process.env.API_BASE_URL + '/tags')
      const requests =
        data?.map((tag) =>
          axios.get(process.env.API_BASE_URL + `/category?tagId=${tag.id}`)
        ) || []
      const responses = await Promise.all(requests)
      const categories =
        responses
          ?.map((response) => {
            return response.data
          })
          ?.flat() || []
      return categories?.map((category) => `/category/${category.id}`) || []
    },
  },

  publicRuntimeConfig: {
    APP_BASE_URL: process.env.APP_BASE_URL,
    API_BASE_URL: process.env.API_BASE_URL,
    PHONE_NUMBER_LONG: process.env.PHONE_NUMBER_LONG,
    PHONE_NUMBER_SHORT: process.env.PHONE_NUMBER_LONG,
    ADDRESS_MAP: process.env.ADDRESS_MAP,
    ADDRESS_TEXT: process.env.ADDRESS_TEXT,
    RESTAURANT_NAME: process.env.RESTAURANT_NAME,
    OUR_CONTACT_1: process.env.OUR_CONTACT_1,
    OUR_CONTACT_1_LINK: process.env.OUR_CONTACT_1_LINK,
    OUR_CONTACT_2: process.env.OUR_CONTACT_2,
    OUR_CONTACT_2_LINK: process.env.OUR_CONTACT_2_LINK,
    OUR_CONTACT_3: process.env.OUR_CONTACT_3,
    OUR_CONTACT_3_LINK: process.env.OUR_CONTACT_3_LINK,
    OUR_BRAND_NAME_AND_CC: process.env.OUR_BRAND_NAME_AND_CC,
    OUR_TELEGRAM_TEXT: process.env.OUR_TELEGRAM_TEXT,
    OUR_TELEGRAM_LINK: process.env.OUR_TELEGRAM_LINK,
    OUR_WHATSAPP_TEXT: process.env.OUR_WHATSAPP_TEXT,
    OUR_WHATSAPP_LINK: process.env.OUR_WHATSAPP_LINK,
  },
}
