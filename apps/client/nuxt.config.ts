export default defineNuxtConfig({
  modules: ['@nuxtjs/apollo', '@nuxtjs/tailwindcss', 'nuxt-vitest'],
  ssr: false,
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://localhost:5000/',
      },
    },
  },
  typescript: {
    strict: true,
  },
  vitest: {
    vitestConfig: {
      environment: 'happy-dom',
      globals: true,
      testTimeout: 20000,
      clearMocks: true,
      setupFiles: './testSetup.ts',
    },
  },
});
