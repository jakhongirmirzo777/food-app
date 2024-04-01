export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Fantasy Burgers | fantasy-burgers.uz',
    htmlAttrs: {
      lang: 'uz',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'description',
        name: 'description',
        content: 'Mazali fast food taomlari',
      },
      {
        hid: 'image',
        name: 'image',
        content: '/logo.jpg',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Fantasy Burgers | fantasy-burgers.uz',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Mazali fast food taomlari',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/logo.jpg',
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
        content: 'fantasy-burgers.uz',
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'Fantasy Burgers | fantasy-burgers.uz',
      },
      { hid: 'robots', name: 'robots', content: 'index, follow' },
      { hid: 'yandex', name: 'yandex', content: 'noindex, follow' },
      {
        hid: 'keywords',
        property: 'keywords',
        content: 'burger, chizburgerlar, hot dog, fast food, mazali taomlar',
      },
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

  publicRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL,
    PHONE_NUMBER_LONG: process.env.PHONE_NUMBER_LONG,
    PHONE_NUMBER_SHORT: process.env.PHONE_NUMBER_LONG,
    ADDRESS_MAP: process.env.ADDRESS_MAP,
    ADDRESS_TEXT: process.env.ADDRESS_TEXT,
    RESTAURANT_NAME: process.env.RESTAURANT_NAME,
  },
}
