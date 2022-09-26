// support/commands.js

import * as cypress from 'cypress';
import { selectors, introDelay } from 'cypress/fixtures/quizr.cy.helpers';


describe('QUIZR Tests', () => {
  const numQuestions = 5;
  const defaultNumQuestions = 10;
  const defaultAnswers = ['1. Martin Luther King Jr.', '2. John F. Kennedy', '3. Rosa Parks', '4. Malcolm X'];
  describe('Quizr intro and choose options proceed and reset', () => {
    it('choose how many questions', () => {
      cy.visit('/')

      cy.get(selectors.quizIntroEl)
        .should('exist.and.be.visible')
        .get(selectors.quizIntroTitleEl)
        .should('have.text', 'Welcome!')

      cy.get(selectors.numQuestionsInput)
        .should('be.visible')
        .clear()
        .type(`${numQuestions}`)

      cy.get(selectors.numQuestionsInput)
        .should('contain.value', `${numQuestions}`)
    });

    it('should have a randomize questions checkbox', () => {
      cy.get(selectors.shouldRandomizeCheckbox)
        .should('be.visible')
        .uncheck()
        .should('be.not.checked')
        .check()
        .should('be.checked')
    });

    it('should have a title', () => {
      cy.get(selectors.title)
        .should('be.visible')
        .should('contain.text', 'Quizr')
    });

    it('should have a zoom button', () => {
      cy.get(selectors.zoomButton)
        .should('be.visible')
        .should('contain.text', 'Zoom')
    });

    it('should have a theme button that toggles the theme', () => {
      cy.get(selectors.themeButton)
        .should('be.visible')
        .should('contain.text', 'dark theme')
        .click()
        .should('contain.text', 'light theme')
        .click()
    });

    it('should have a reset button', () => {
      cy.get(selectors.resetButton)
        .should('be.visible')
        .should('contain.text', 'Reset')
    });

    it('should have a begin button and change the screen when clicked', () => {
      cy.get(selectors.beginButton)
        .should('be.visible')
        .should('contain.text', 'Begin')
        .click()
    });

    it('should have the number of questions specified', () => {
      cy
        .wait(introDelay)
      cy.get(selectors.sideNavQuestions)
        .should('have.length', numQuestions)
    });

    it('should reset the quiz when the reset button is clicked', () => {
      cy.get(selectors.resetButton)
        .wait(100)  
        .click()

      cy.get(selectors.sideNav)
        .should('not.exist')
    });
  });

  describe('Choose default options and test sidenav', () => {
    it('should have a begin button and change the screen when clicked', () => {
      cy.visit('/')
      cy.get(selectors.beginButton)
        .should('be.visible')
        .should('contain.text', 'Begin')
        .click()
    });

    it('should have a sidenav', () => {
      cy.wait(introDelay)
      cy.get(selectors.sideNav)
        .should('be.visible')
      cy.get(selectors.sideNavQuestions)
        .should('have.length', defaultNumQuestions)
    });

    it('should have a sidenav with the correct text and question numbers', () => {
      cy.get(selectors.sideNavQuestions)
        .each(($el, index) => {
          cy.wrap($el)
            .should('contain.text', `Question #${index + 1}`)
        })
    });

    it('should have the first item in the sidenav active', () => {
      cy.get(selectors.sideNavQuestions)
        .first()
        .should('have.class', 'active')
    });

    it('should have the second item in the sidenav active when clicked', () => {
      cy.get(selectors.sideNavQuestions)
        .first()
        .should('have.class', 'active')
      
      cy.get(selectors.sideNavQuestions)
        .eq(1)
        .click()
        .should('have.class', 'active')
        .get(selectors.sideNavQuestions)
        .first()
        .should('not.have.class', 'active')
    });
  });

  describe('Choose default options and test quiz nav and info', () => {
    it('should have a begin button and change the screen when clicked', () => {
      cy.visit('/')
      cy.get(selectors.beginButton)
        .should('be.visible')
        .should('contain.text', 'Begin')
        .click()
    });

    it('should have a quiz nav', () => {
      cy.wait(introDelay)
      cy.get(selectors.quizNav)
        .should('be.visible')
    });

    it('should have a quiz nav with a prev button', () => {
      cy.get(selectors.quizNavPrevBtn)
        .should('be.visible')
        .should('contain.text', 'Prev')
    });

    it('should have a quiz nav with a next button', () => {
      cy.get(selectors.quizNavNextBtn)
        .should('be.visible')
        .should('contain.text', 'Next')
    });

    it('should have a quiz info with the right text', () => {
      cy.get(selectors.quizInfo)
        .should('be.visible')
        .should('contain.text', `1 of ${defaultNumQuestions}`)
    });

    it('should have a prev button that is disabled on the first question', () => {
      cy.get(selectors.quizNavPrevBtn)
        .should('be.disabled')
    });

    it('should have a next button that is enabled on the first question', () => {
      cy.get(selectors.quizNavNextBtn)
        .should('be.not.disabled')
    });

    it('should have a quiz info with the right text when the next button is clicked', () => {
      cy.get(selectors.quizNavNextBtn)
        .click()
        .get(selectors.quizInfo)
        .should('contain.text', `2 of ${defaultNumQuestions}`)
    });

    it('should have a prev button that is enabled on the second question', () => {
      cy.get(selectors.quizNavPrevBtn)
        .should('be.not.disabled')
    });

    it(`should have a next button that is disabled when clicked ${defaultNumQuestions - 1} times and have the right info text`, () => {
      for (const iterator in Array(defaultNumQuestions - 2).fill(0)) {
        cy.get(selectors.quizNavNextBtn)
          .click()

        cy.get(selectors.quizInfo)
          .should('contain.text', `${Number(iterator) + 3} of ${defaultNumQuestions}`)
      }
      cy.get(selectors.quizNavNextBtn)
        .should('be.disabled')
    });

    it(`should now go in reverse and have a prev button that is disabled when clicked ${defaultNumQuestions - 1} times and have the right info text`, () => {
      for (const iterator in Array(defaultNumQuestions - 1).fill(0)) {
        cy.get(selectors.quizNavPrevBtn)
          .click()

        cy.get(selectors.quizInfo)
          .should('contain.text', `${(defaultNumQuestions - 1) - Number(iterator)} of ${defaultNumQuestions}`)
      }
      cy.get(selectors.quizNavPrevBtn)
        .should('be.disabled')
    });

  });

  describe('Choose default options and test quiz content',()=>{
    it('should have a begin button and change the screen when clicked', () => {
      cy.visit('/')
      cy.get(selectors.shouldRandomizeCheckbox)
        .click()
      cy.get(selectors.beginButton)
        .should('be.visible')
        .should('contain.text', 'Begin')
        .click()
    });

    it('should have a quiz content', () => {
      cy.wait(introDelay)
      cy.get(selectors.quizContent)
        .should('be.visible')
    });

    it('should have a quiz content with a question', () => {
      cy.get(selectors.quizContentQuestion)
        .should('be.visible')
        .should('contain.text', 'Who gave the famous "I have a dream" speech?')
    });

    it('should have a question subject', () => {
      cy.get(selectors.quizContentQuestionSubject)
        .should('be.visible')
        .should('contain.text', 'history')
    });

    it('should have a quiz content with a question with 4 answers', () => {
      cy.get(selectors.quizContentQuestionOptions)
        .children()
        .should('have.length', 4)
    });

    it('should have a quiz content with a disabled lock answer button', () => {
      cy.get(selectors.quizContentQuestionAnswerLockButton)
        .should('be.visible')
        .should('be.disabled')
    });

    it('should have a quiz content with a question with the correct answers', () => {
      cy.get(selectors.quizContentQuestionOptions)
        .children()
        .each(($el, index) => {
          cy.wrap($el)
            .should('contain.text', defaultAnswers[index])
        })
    });

    it('should be able to select an answer', () => {
      cy.get(selectors.quizContentQuestionOptions)
        .children()
        .each(($el, index) => {
          cy.wrap($el)
            .click()
            .should('have.class', 'picked')
        })
    });

    it('should be able to select an answer and lock too reveal the results of a correct answer', () => {
      cy.get(selectors.quizContentQuestionOptions)
        .children()
        .eq(0)
        .click()
        .should('have.class', 'picked')
        .get(selectors.quizContentQuestionAnswerLockButton)
        .should('be.visible')
        .should('contain.text', 'lock in my answer')
        .should('not.be.disabled')
        .click()
        .get(selectors.quizContentResult)
        .should('be.visible')
        .should('contain.text', 'Correct!!!')
    });

    it('should be able to select an answer and lock too reveal the results of an incorrect answer', () => {
      cy.get(selectors.sideNavQuestions)
        .children()
        .eq(1)
        .click()
        .get(selectors.quizContentQuestionOptions)
        .children()
        .eq(0)
        .click()
        .should('have.class', 'picked')
        .get(selectors.quizContentQuestionAnswerLockButton)
        .should('be.visible')
        .should('contain.text', 'lock in my answer')
        .click()
        .get(selectors.quizContentResult)
        .should('be.visible')
        .should('contain.text', 'Wrong, the correct answer is: Calpurnia')
    });
  });

  // describe('xxxxxxxxxxxxx',()=>{
  //   it('should have a begin button and change the screen when clicked', () => {
  //     cy.visit('/')
  //     cy.get(selectors.beginButton)
  //       .should('be.visible')
  //       .should('contain.text', 'Begin')
  //       .click()
  //   });
  // });
});