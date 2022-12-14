import { createReducer, on } from '@ngrx/store';

import { QuizAnswers, QuizQuestion, QuizState } from '../models/quiz.models';
import { quizActions } from './quiz.state.actions';

// const initialQuizStateQuestions: ReadonlyArray<QuizQuestion[]> = [];

export const initAnswersFromQuestions = (questions: ReadonlyArray<QuizQuestion>) => {
  return questions.reduce((acc, question) => {
    return {
      ...acc,
      [question.id]: {
        answerIndex: -1,
      },
    };
  }, {}) as QuizAnswers;
};

export const initialQuizState: QuizState = {
  questions: [],
  answers: {},
  currentQuestionIndex: 0,
  errors: [],
  isLoading: false,
  theme: 'light',
  zoom: 1,
  panel: 'intro',
  quizOptions: {
    numberOfQuestions: 10,
    shouldRandomize: true,
  },
  quizSessionId:(Math.random() * 200000).toString(36).replace('.','')
};

export const quizStateReducer = createReducer(
  initialQuizState,
  on(quizActions.loadQuestions, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(quizActions.loadQuestionsSuccess, (state, { payload }) => {
    const questions = payload.slice(0);
    if(state.quizOptions.shouldRandomize) {
      questions.sort(() => Math.random() - 0.5);
    }
    return {
      ...state,
      questions: questions.slice(0, state.quizOptions.numberOfQuestions),
      answers: initAnswersFromQuestions(questions),
      isLoading: false,
    };
  }),
  on(quizActions.loadQuestionsFailure, (state, { payload }) => {
    return {
      ...state,
      errors: [...state.errors, payload],
      isLoading: false,
    };
  }),
  on(quizActions.closeError, (state, { payload }) => {
    return {
      ...state,
      errors: state.errors.filter((_, index) => index !== payload),
    };
  }),
  on(quizActions.nextQuestion, (state) => {
    const hasNextQuestion = state.questions[state.currentQuestionIndex + 1];
    return {
      ...state,
      currentQuestionIndex: hasNextQuestion
        ? state.currentQuestionIndex + 1
        : state.currentQuestionIndex,
    };
  }),
  on(quizActions.previousQuestion, (state) => {
    const hasPreviousQuestion = state.questions[state.currentQuestionIndex - 1];
    return {
      ...state,
      currentQuestionIndex: hasPreviousQuestion
        ? state.currentQuestionIndex - 1
        : state.currentQuestionIndex,
    };
  }),
  on(quizActions.selectQuestionByIndex, (state, { payload }) => {
    const maxIndex = state.questions.length - 1;
    return {
      ...state,
      currentQuestionIndex: payload > maxIndex ? state.currentQuestionIndex : payload,
    };
  }),
  on(quizActions.setTheme, (state, { payload }) => {
    return {
      ...state,
      theme: payload,
    };
  }),
  on(quizActions.setZoom, (state) => {
    let zoom = state.zoom + 0.25;
    if(zoom > 1.5) zoom = 1;
    return {
      ...state,
      zoom,
    };
  }),
  on(quizActions.answerQuestion, (state, { payload }) => {
    return {
      ...state,
      answers: {
        ...state.answers,
        [state.questions[state.currentQuestionIndex].id]: {answerIndex: payload},
      },
    };
  }),
  on(quizActions.lockAnswer, (state) => {
    return {
      ...state,
      answers: {
        ...state.answers,
        [state.questions[state.currentQuestionIndex].id]: {
          ...state.answers[state.questions[state.currentQuestionIndex].id],
          isLocked: true,
          isCorrect: state.questions[state.currentQuestionIndex].answerIndex === state.answers[state.questions[state.currentQuestionIndex].id].answerIndex
        },
      },
    };
  }),
  on(quizActions.resetQuiz, (state) => {
    return {
      ...initialQuizState,
      quizOptions: state.quizOptions,
    };
  }),
  on(quizActions.setQuizOptions, (state, { payload }) => {
    return {
      ...state,
      panel: 'questions',
      quizOptions: {
        ...state.quizOptions,
        ...payload,
      }
    };
  }),
  on(quizActions.setQuizPanel, (state, { payload }) => {
    return {
      ...state,
      panel: payload,
    };
  }),
);
