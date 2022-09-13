import { createFeatureSelector, createSelector } from "@ngrx/store";

import { QuizState } from 'src/app/models/quiz.models';

const quizFeature = createFeatureSelector<QuizState>('quiz');
export const selectQuizState = createSelector(
  quizFeature,
  (state: QuizState) => state,
);

export const selectAllQuestions = createSelector(
  quizFeature,
  (state: QuizState) => state.questions,
);

export const selectCurrentQuestion = createSelector(
  quizFeature,
  (state: QuizState) => state.questions[state.currentQuestionIndex],
);

export const selectCurrentQuestionIndex = createSelector(
  quizFeature,
  (state: QuizState) => state.currentQuestionIndex,
);

export const selectTheme = createSelector(
  quizFeature,
  (state: QuizState) => state.theme,
);

export const selectZoom = createSelector(
  quizFeature,
  (state: QuizState) => state.zoom,
);

