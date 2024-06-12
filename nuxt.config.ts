// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  eslint: {
    checker: true,
    config: {
      stylistic: true,
    },
  },
})
