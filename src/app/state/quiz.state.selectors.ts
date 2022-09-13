import { createFeatureSelector, createSelector } from "@ngrx/store";

import { AppState } from "../models/app.model";
import { QuizState } from 'src/app/models/quiz.models';

const quizFeature = createFeatureSelector<QuizState>('quiz');
export const selectQuizState = createSelector(
  quizFeature,
  (state: QuizState) => state,
);

export const selectCurrentQuestion = createSelector(
  quizFeature,
  (state: QuizState) => state.questions[state.currentQuestionIndex],
);

export const selectCurrentQuestionIndex = createSelector(
  quizFeature,
  (state: QuizState) => state.currentQuestionIndex,
);