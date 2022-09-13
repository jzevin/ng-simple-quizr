import { createReducer, on } from "@ngrx/store";

import { QuizState } from "../models/quiz.models";
import { quizActions } from './quiz.state.actions';

// const initialQuizStateQuestions: ReadonlyArray<QuizQuestion[]> = [];

const initialQuizState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  error: null,
  loading: false,
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
      questions: payload,
      loading: false,
    };
  }),
  on(quizActions.loadQuestionsFailure, (state, {payload}) => {
    return {
      ...state,
      error: payload,
      loading: false,
    };
  })
);
