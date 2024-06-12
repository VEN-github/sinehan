// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  eslint: {
    checker: true,
    config: {
      stylistic: true,
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Sinehan',
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        {
          rel: 'mask-icon',
          href: '/safari-pinned-tab.svg',
          color: '#a7a9be',
        },
      ],
      meta: [
        {
          name: 'description',
          content:
            'Explore our app: your exclusive portal to movie magic, packed with ratings, reviews, and all the film info you crave. Elevate your movie experience!',
        },
        { name: 'msapplication-TileColor', content: '#0f0e17' },
        { name: 'theme-color', content: '#0f0e17' },
      ],
    },
  },
})
