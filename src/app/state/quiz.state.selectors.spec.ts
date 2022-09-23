import { QuizStateTestFixture } from '../testing/quiz.state.fixtures';
import * as qzSelectors from "./quiz.state.selectors";


describe('Quiz State Selectors', () => {
  
  it('should select quiz state', () => {
    expect(qzSelectors.selectQuizState.projector(QuizStateTestFixture)).toEqual(QuizStateTestFixture);
  });

  it('should select all questions', () => {
    expect(qzSelectors.selectAllQuestions.projector(QuizStateTestFixture)).toEqual(QuizStateTestFixture.questions);
  });

  it('should select is loading', () => {
    expect(qzSelectors.selectIsLoading.projector(QuizStateTestFixture)).toEqual(QuizStateTestFixture.isLoading);
  });

  it('should select current question', () => {
    expect(qzSelectors.selectCurrentQuestion.projector(QuizStateTestFixture)).toEqual(QuizStateTestFixture.questions[QuizStateTestFixture.currentQuestionIndex]);
  });

  it('should select current question index', () => {
    expect(qzSelectors.selectCurrentQuestionIndex.projector(QuizStateTestFixture)).toEqual(QuizStateTestFixture.currentQuestionIndex);
  });

  it('should select theme', () => {
    expect(qzSelectors.selectTheme.projector(QuizStateTestFixture)).toEqual(QuizStateTestFixture.theme);
  });

  it('should select zoom', () => {
    expect(qzSelectors.selectZoom.projector(QuizStateTestFixture)).toEqual(QuizStateTestFixture.zoom);
  });

  it('should select answers', () => {
    expect(qzSelectors.selectAnswers.projector(QuizStateTestFixture)).toEqual(QuizStateTestFixture.answers);
  });

  it('should select current answer', () => {
    expect(qzSelectors.selectCurrentAnswer.projector(QuizStateTestFixture, QuizStateTestFixture.answers)).toEqual(
      QuizStateTestFixture.answers[
        QuizStateTestFixture.questions[0].id
      ]
    );
  });

  it('should select current question and answer', () => {
    expect(qzSelectors.selectCurrentQuestionAndAnswer.projector(
      QuizStateTestFixture.questions[0],
      QuizStateTestFixture.answers[QuizStateTestFixture.questions[0].id]
    )).toEqual({
      question: QuizStateTestFixture.questions[0],
      answer: QuizStateTestFixture.answers[QuizStateTestFixture.questions[0].id]
    });
  });

  it('should select errors', () => {
    expect(qzSelectors.selectErrors.projector(QuizStateTestFixture)).toEqual(QuizStateTestFixture.errors);
  });

  it('should select panel', () => {
    expect(qzSelectors.selectPanel.projector(QuizStateTestFixture)).toEqual(QuizStateTestFixture.panel);
  });

  it('should select quizOptions', () => {
    expect(qzSelectors.selectQuizOptions.projector(QuizStateTestFixture)).toEqual(QuizStateTestFixture.quizOptions);
  });

});