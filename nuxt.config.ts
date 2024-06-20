// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxt/fonts',
    'nuxt-vuefire',
    'nuxt-lucide-icons'
  ],
  css: ['~/assets/css/animation.css'],
  eslint: {
    checker: true,
    config: {
      stylistic: {
        semi: false,
        indent: 2,
        quotes: 'single'
      }
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Sinehan',
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png'
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        {
          rel: 'mask-icon',
          href: '/safari-pinned-tab.svg',
          color: '#a7a9be'
        }
      ],
      meta: [
        {
          name: 'description',
          content:
            'Explore our app: your exclusive portal to movie magic, packed with ratings, reviews, and all the film info you crave. Elevate your movie experience!'
        },
        { name: 'msapplication-TileColor', content: '#0f0e17' },
        { name: 'theme-color', content: '#0f0e17' },
        {
          property: 'og:url',
          content: 'https://sinehan.vercel.app/'
        },
        {
          property: 'og:title',
          content: 'Sinehan'
        },
        {
          property: 'og:description',
          content:
            'Explore our app: your exclusive portal to movie magic, packed with ratings, reviews, and all the film info you crave. Elevate your movie experience!'
        },
        {
          property: 'og:image',
          content: '/og-image.jpg'
        },
        {
          property: 'og:image:type',
          content: 'image/jpeg'
        },
        {
          name: 'twitter:card',
          content: 'summary'
        },
        {
          name: 'robots',
          content: 'index, follow'
        }
      ]
    }
  },
  vuefire: {
    auth: {
      enabled: true,
      sessionCookie: true
    },
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID
    }
  },
  runtimeConfig: {
    tmdbApiKey: process.env.TMDB_API_KEY,
    public: {
      tmdbPublicApiUrl: process.env.TMDB_PUBLIC_API_URL
    }
  },
  lucide: {
    namePrefix: 'Icon'
  }
})
