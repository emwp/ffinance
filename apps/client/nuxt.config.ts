export default defineNuxtConfig({
  modules: ['@nuxtjs/apollo', '@nuxtjs/tailwindcss'],
  ssr: false,
  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.SERVER_URL || 'http://localhost:5000',
      },
    },
  },
  typescript: {
    strict: true,
  },
});
