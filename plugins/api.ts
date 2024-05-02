export default defineNuxtPlugin({
  setup() {
    const api = $fetch.create({
      baseURL: useRuntimeConfig().public.apiBase ?? 'https://jsonplaceholder.typicode.com/',
    })

    return {
      provide: {
        api
      }
    }
  }
})
