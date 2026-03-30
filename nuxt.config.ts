export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    'vue3-carousel-nuxt',
    '@pinia/nuxt',
  
  ],

  pages: true,

  css: [
    '~/assets/css/main.css',
    '@vueup/vue-quill/dist/vue-quill.snow.css'
  ],

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },

    head: {
      title: 'Abanise Enterprises - Buy and Sell Properties in Nigeria',

      htmlAttrs: {
        lang: 'en'
      },

      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Abanise Enterprises - Buy and Sell Properties in Nigeria' }
      ],

      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },

        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
        },

        {
          rel: 'icon',
          type: 'image/png',
          href: '/images/unilorin.png'
        }
      ]
    }
  },

  runtimeConfig: {
    mapboxSecret: process.env.MAPBOX_SECRET || '',
    api_url: process.env.BASE_URL || 'http://localhost:5000',

    public: {
      projectName: 'true people buy property and sell it',
      mapboxToken: process.env.NUXT_PUBLIC_MAPBOX_TOKEN || '',
        api_url: process.env.BASE_URL || 'http://localhost:5000',

    }
  }
})