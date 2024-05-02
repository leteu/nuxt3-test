// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  typescript: {
    typeCheck: true
  },

  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: '',
    // Keys within public are also exposed client-side
    public: {
      apiBase: 'https://jsonplaceholder.typicode.com',
    }
  },

  vite: {},

  modules: ["@nuxt/eslint", "@pinia/nuxt"]
})
