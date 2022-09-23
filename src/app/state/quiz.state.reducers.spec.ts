import { QuizOptions } from '../models/quiz.models';
import { QuizStateTestFixture } from '../testing/quiz.state.fixtures';
import { quizActions } from './quiz.state.actions';
import { quizStateReducer, initialQuizState, initAnswersFromQuestions } from "./quiz.state.reducers";

const questions = QuizStateTestFixture.questions;

describe('QuizStateReducer', () => {

  describe('load Questions sequence', () => {

    it('should set initial quiz state and isLoading', () => {
      const state = quizStateReducer(initialQuizState, quizActions.loadQuestions);
      expect(state).toEqual({
        ...initialQuizState,
        isLoading: true,
      });
    });

    it('should set questions and answers upon loading success', () => {
      const initialState = {
        ...initialQuizState,
        quizOptions: {
          numberOfQuestions: 2,
          shouldRandomize: false,
        },
      };
      const state = quizStateReducer(initialState, quizActions.loadQuestionsSuccess({ payload: [...questions] }));
      expect(state).toEqual({
        ...initialState,
        questions: [...questions],
        answers: initAnswersFromQuestions(questions),
      });
    });

    it('should set randomized questions with a length of 1 upon loading success', () => {
      const initialState = {
        ...initialQuizState,
        quizOptions: {
          numberOfQuestions: 1,
          shouldRandomize: true,
        },
      };
      const state = quizStateReducer(initialState, quizActions.loadQuestionsSuccess({ payload: [...questions] }));
      expect(state.questions.length).toBe(1);
      expect(state.questions).toBeTruthy();
      // NOTE: there's only two questions in the fixture, so we can't really test for randomness but can get the coverage by getting to the if statement
    });

    it('should set errors on state upon loading failure', () => {
      const existingError = new Error('existing error');
      const newError = new Error('new error');
      const state = quizStateReducer({
        ...initialQuizState,
        errors: [existingError],
      }, quizActions.loadQuestionsFailure({ payload: newError }));
      expect(state).toEqual({
        ...initialQuizState,
        errors: [existingError, newError],
        isLoading: false,
      });
    });

  });

  describe('close error', () => {
    it('should remove error from state', () => {
      const existingError = new Error('existing error');
      const state = quizStateReducer({
        ...initialQuizState,
        errors: [existingError],
      }, quizActions.closeError({ payload: 0 }));
      expect(state).toEqual({
        ...initialQuizState,
        errors: [],
      });
    });
  });

  describe('next question', () => {
    it('should increment current question index', () => {
      const state = quizStateReducer({
        ...initialQuizState,
        questions: [...questions],
        currentQuestionIndex: 0,
      }, quizActions.nextQuestion());
      expect(state).toEqual({
        ...initialQuizState,
        questions: [...questions],
        currentQuestionIndex: 1,
      });
    });

    it('should not increment current question index if already at last question', () => {
      const state = quizStateReducer({
        ...initialQuizState,
        questions: [...questions],
        currentQuestionIndex: questions.length - 1,
      }, quizActions.nextQuestion());
      expect(state).toEqual({
        ...initialQuizState,
        questions: [...questions],
        currentQuestionIndex: questions.length - 1,
      });
    });
  });

  describe('previous question', () => {
    it('should decrement current question index', () => {
      const state = quizStateReducer({
        ...initialQuizState,
        questions: [...questions],
        currentQuestionIndex: 1,
      }, quizActions.previousQuestion());
      expect(state).toEqual({
        ...initialQuizState,
        questions: [...questions],
        currentQuestionIndex: 0,
      });
    });

    it('should not decrement current question index if already at first question', () => {
      const state = quizStateReducer({
        ...initialQuizState,
        questions: [...questions],
        currentQuestionIndex: 0,
      }, quizActions.previousQuestion());
      expect(state).toEqual({
        ...initialQuizState,
        questions: [...questions],
        currentQuestionIndex: 0,
      });
    });
  });

  describe('set question by index', () => {
    it('should set current question index', () => {
      const state = quizStateReducer({
        ...initialQuizState,
        questions: [...questions],
        currentQuestionIndex: 0,
      }, quizActions.selectQuestionByIndex({ payload: 1 }));
      expect(state).toEqual({
        ...initialQuizState,
        questions: [...questions],
        currentQuestionIndex: 1,
      });
    });

    it('should not set current question index if index is out of bounds', () => {
      const state = quizStateReducer({
        ...initialQuizState,
        questions: [...questions],
        currentQuestionIndex: 0,
      }, quizActions.selectQuestionByIndex({ payload: 2 }));
      expect(state).toEqual({
        ...initialQuizState,
        questions: [...questions],
        currentQuestionIndex: 0,
      });
    });
  });

  describe('set theme', () => {
    it('should set theme', () => {
      const state = quizStateReducer({
        ...initialQuizState,
        theme: 'light',
      }, quizActions.setTheme({ payload: 'dark' }));
      expect(state).toEqual({
        ...initialQuizState,
        theme: 'dark',
      });
    });
  });

  describe('set zoom', () => {
    it('should set zoom', () => {
      const state = quizStateReducer({
        ...initialQuizState,
        zoom: 1,
      }, quizActions.setZoom());
      expect(state).toEqual({
        ...initialQuizState,
        zoom: 1.25,
      });
    });
    it('should set zoom to 1 after exceeding threshold', () => {
      const state = quizStateReducer({
        ...initialQuizState,
        zoom: 1.5,
      }, quizActions.setZoom());
      expect(state).toEqual({
        ...initialQuizState,
        zoom: 1,
      });
    });
  });

  describe('answer question', () => {
    it('should set answer for question', () => {
      const state = quizStateReducer({
        ...initialQuizState,
        questions: [...questions],
        answers: initAnswersFromQuestions(questions),
      }, quizActions.answerQuestion({ payload: 0 }));
      expect(state).toEqual({
        ...initialQuizState,
        questions: [...questions],
        answers: {
          ...state.answers,
          [questions[0].id]: {answerIndex: 0},
        },
      });
    });
  });

  describe('lock answer', () => {
    it('should lock answer for question', () => {
      const state = quizStateReducer({
        ...initialQuizState,
        questions: [...questions],
        answers: {
          ...initAnswersFromQuestions(questions),
          [questions[0].id]: {answerIndex: 0},
        },
      }, quizActions.lockAnswer());
      expect(state).toEqual({
        ...initialQuizState,
        questions: [...questions],
        answers: {
          ...state.answers,
          [questions[0].id]: {
            answerIndex: 0,
            isLocked: true,
            isCorrect: true,
          },
        },
      });
    });
    it('should lock answer for question and not be correct', () => {
      const state = quizStateReducer({
        ...initialQuizState,
        questions: [...questions],
        answers:  {
          ...initAnswersFromQuestions(questions),
          [questions[0].id]: {answerIndex: 1},
        },
      }, quizActions.lockAnswer());
      expect(state).toEqual({
        ...initialQuizState,
        questions: [...questions],
        answers: {
          ...state.answers,
          [questions[0].id]: {
            answerIndex: 1,
            isLocked: true,
            isCorrect: false,
          },
        },
      });
    });
  });

  describe('reset quiz', () => {
    it('should reset qui to initial quiz state but persist existing options', () => {
      const existingQuizOptions: QuizOptions = {
        numberOfQuestions: 2,
        shouldRandomize: false,
      }
      const state = quizStateReducer({
        ...initialQuizState,
        questions: [...questions],
        answers: {
          ...initAnswersFromQuestions(questions),
          [questions[0].id]: {answerIndex: 0},
        },
        currentQuestionIndex: 1,
        quizOptions: existingQuizOptions,
      }, quizActions.resetQuiz());
      expect(state).toEqual({
        ...initialQuizState,
        quizOptions: existingQuizOptions,
      });
    });
  });

  describe('set quiz options and advance panel', () => {
    it('should set quiz options', () => {
      const quizOptions: QuizOptions = {
        numberOfQuestions: 2,
        shouldRandomize: false,
      }
      const state = quizStateReducer({
        ...initialQuizState,
      }, quizActions.setQuizOptions({ payload: quizOptions }));
      expect(state).toEqual({
        ...initialQuizState,
        quizOptions,
        panel: 'questions',
      });
    });
  });

  describe('set quiz panel', () => {
    it('should set quiz panel', () => {
      const state = quizStateReducer({
        ...initialQuizState,
      }, quizActions.setQuizPanel({ payload: 'questions' }));
      expect(state).toEqual({
        ...initialQuizState,
        panel: 'questions',
      });
    });
  });

});