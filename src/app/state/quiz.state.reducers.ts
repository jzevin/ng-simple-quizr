import { createReducer, on } from '@ngrx/store';

import { QuizState } from '../models/quiz.models';
import { quizActions } from './quiz.state.actions';

// const initialQuizStateQuestions: ReadonlyArray<QuizQuestion[]> = [];

const initialQuizState: QuizState = {
  questions: [],
  answers: {},
  currentQuestionIndex: 0,
  error: null,
  loading: true,
  theme: 'light',
  zoom: 1,
};

export const quizStateReducer = createReducer(
  initialQuizState,
  on(quizActions.loadQuestions, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(quizActions.loadQuestionsSuccess, (state, { payload }) => {
    return {
      ...state,
      questions: payload.slice(0,20).sort(() => Math.random() - 0.5),
      answers: payload.reduce((acc, question) => {
        return {
          ...acc,
          [question.id]: {
            answerIndex: -1,
          },
        };
      }, {}),
      loading: false,
    };
  }),
  on(quizActions.loadQuestionsFailure, (state, { payload }) => {
    return {
      ...state,
      error: payload,
      loading: false,
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
    return {
      ...state,
      currentQuestionIndex: payload,
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
    if(zoom > 2) zoom = 1;
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
);
