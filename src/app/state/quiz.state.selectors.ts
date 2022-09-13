import { createFeatureSelector, createSelector } from "@ngrx/store";

import { AppState } from "../models/app.model";
import { QuizState } from 'src/app/models/quiz.models';

const quizFeature = createFeatureSelector<QuizState>('quiz');
export const selectQuizState = createSelector(
  quizFeature,
  (state: QuizState) => state,
);

export const selectQuizStateCurrentQuestion = createSelector(
  quizFeature,
  (state: QuizState) => state.questions[state.currentQuestionIndex],
);