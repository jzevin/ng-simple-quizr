describe('QUIZR Tests', () => {
  const numQuestions = 5;
  const selectors = {
    title: 'h1',
    quizIntroEl: 'qzr-quiz-intro',
    quizIntroTitleEl: 'qzr-quiz-intro h1',
    numQuestionsInput: 'input[name="numberOfQuestions"]',
    shouldRandomizeCheckbox: 'input[name="shouldRandomize"]',
    beginButton: 'button[type="submit"]',
    zoomButton: 'button.zoom-btn',
    themeButton: 'button.theme-btn',
    resetButton: 'button.reset-btn',
    sideNav: 'qzr-quiz-sidenav',
    sideNavQuestions: 'qzr-quiz-sidenav .question',
  };
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
        .wait(2500)
      cy.get(selectors.sideNavQuestions)
        .should('have.length', numQuestions)
    });

    it('should reset the quiz when the reset button is clicked', () => {
      cy.get(selectors.resetButton)
        .wait(1000)  
        .click()

      cy.get(selectors.sideNav)
        .should('not.exist')
    });
  });

  // TODO: test all the quiz functionality
  // -- test the quiz results
  // -- test the quiz settings
  // -- test locking/answering questions
});