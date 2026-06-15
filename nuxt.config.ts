export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'vue3-carousel-nuxt',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxtjs/sitemap',
  ],

  site: {
    url: 'https://abanise.com'
  },

sitemap: {
    discoverImages: false,

  exclude: [
    '/auth',
    '/resetpassword',

    '/admin/**',

    '/user/**'
  ],
  urls: async () => {
    const response = await fetch(
      'https://www.api.abanise.com/property/sitemap'
    ).then(res => res.json())
     const agentResponse = await fetch(
      'https://www.api.abanise.com/profile/sitemap'
    ).then(res => res.json())
    const staticRoutes = [
      '/about-us',
      '/contact-us',
      '/privacy-policy',
      '/resetpassword',
      '/auth?type=register-page',
      '/auth?type=login-page',
      '/terms-and-conditions'
    ]

    const propertyRoutes = (response.data || []).map(
      (property: any) => ({
        loc: `/property/${property.slug}`
      })
    )
    const  profileRoutes = (agentResponse.data || []).map(
      (profile: any) => ({
        loc:`/profile/${profile.userId}`
      })
    )

    return [
      ...staticRoutes.map(route => ({
        loc: route
      })),
      ...profileRoutes,
      ...propertyRoutes
    ]
  }
},

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
        {
          charset: 'utf-8'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          name: 'description',
          content:
            'Abanise Enterprises - Buy and Sell Properties in Nigeria'
        }
      ],

      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
        },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/images/abanise.png'
        }
      ]
    }
  },

  runtimeConfig: {
    mapboxSecret: process.env.MAPBOX_SECRET || '',
    api_url: process.env.BASE_URL || 'http://localhost:5000',
    geminiApiKey: process.env.GEMINI_API_KEY,

    public: {
      projectName: 'true people buy property and sell it',
      mapboxToken: process.env.NUXT_PUBLIC_MAPBOX_TOKEN || '',
      api_url: process.env.BASE_URL || 'http://localhost:5000'
    }
  }
})