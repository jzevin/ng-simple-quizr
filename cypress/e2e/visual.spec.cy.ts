import '@frsource/cypress-plugin-visual-regression-diff';
import { selectors, introDelay } from 'cypress/fixtures/quizr.cy.helpers';

describe('Quizr', () => {
  it('Intro', () => {
    cy.visit('/')
    cy.matchImage()
  })

  it('Quiz', () => {
    cy.visit('/')
    cy.get(selectors.shouldRandomizeCheckbox).uncheck()
    cy.get(selectors.beginButton).click()
    cy.wait(introDelay).matchImage()

    cy.get(selectors.quizContentQuestionOptions)
      .children()
      .first()
      .click()
    cy.get(selectors.quizContentQuestionAnswerLockButton)
      .click()
    cy.wait(introDelay).matchImage()

    cy.get(selectors.themeButton).click()
    cy.wait(introDelay).matchImage()

    cy.get(selectors.zoomButton).click()
    cy.wait(introDelay).matchImage()

    cy.get(selectors.zoomButton).click()
    cy.wait(introDelay).matchImage()

    cy.get(selectors.themeButton).click()
    cy.wait(introDelay).matchImage()

    cy.get(selectors.resetButton).click()
    cy.wait(introDelay).matchImage()
  })
})