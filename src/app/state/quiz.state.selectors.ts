import { createFeatureSelector, createSelector } from "@ngrx/store";

import { AppState } from "../models/app.model";

const quizFeature = createFeatureSelector<AppState>('quiz');
export const selectQuizState = createSelector(
  quizFeature,
  (state: AppState) => state.quiz,
);