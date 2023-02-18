export default defineNuxtConfig({
  modules: ['@nuxtjs/apollo', '@nuxtjs/tailwindcss', 'nuxt-vitest'],
  ssr: false,
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://countries.trevorblades.com/graphql',
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
      setupFiles: './config/testSetup.ts',
    },
  },
});
