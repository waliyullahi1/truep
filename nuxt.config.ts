export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    'vue3-carousel-nuxt',
    '@pinia/nuxt',
    '@pinia/nuxt'
  ],

  //   plugins: [
  //   '~/plugins/pinia.js'
  // ],
  pages: true,

  css: ['~/assets/css/main.css', '@vueup/vue-quill/dist/vue-quill.snow.css'],

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },

    head: {
      title: 'UNILORIN Nursery And Primary School',

      htmlAttrs: {
        lang: 'en'
      },

      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'UNILORIN Nursery And Primary School Portal' }
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

        // favicon (use leading slash so it works in production)
        {
          rel: 'icon',
          type: 'image/png',
          href: '/images/unilorin.png'
        }
      ]
    }
  },

  /* =========================
     Runtime Config (SAFE KEYS)
  ========================= */
  runtimeConfig: {
    // server-only secrets go here (not exposed)
    mapboxSecret: process.env.MAPBOX_SECRET || '',

    // exposed to browser
    public: {
      projectName: 'UNILORIN Nursery And Primary School',

      // must start with NUXT_PUBLIC_
      mapboxToken: process.env.NUXT_PUBLIC_MAPBOX_TOKEN || ''
    }
  }
})