/// <reference types="cypress" />

export default {
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    retries: {
      runMode: 2,
      openMode: 2,
    },
    defaultCommandTimeout: 10000,
    waitForAnimations: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
