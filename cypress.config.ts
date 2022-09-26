import { defineConfig } from 'cypress'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { initPlugin } = require("@frsource/cypress-plugin-visual-regression-diff/dist/plugins");


export default defineConfig({

  viewportWidth: 900, 
  viewportHeight: 660,
  
  e2e: {
    'baseUrl': 'http://localhost:4200',
    supportFile: false,
    setupNodeEvents(on, config) {
      initPlugin(on, config);
    },
  },
  
  
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }
  
})