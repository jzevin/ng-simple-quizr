import { QuizAnswers, QuizState } from 'src/app/models/quiz.models';
import { createFeatureSelector, createSelector } from "@ngrx/store";

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

export const selectAnswers = createSelector(
  quizFeature,
  (state: QuizState) => state.answers,
);

export const selectCurrentAnswer = createSelector(
  quizFeature,
  selectAnswers,
  (state, answers: QuizAnswers) => answers[state.questions[state.currentQuestionIndex]?.id],
);

export const selectCurrentQuestionAndAnswer = createSelector(
  selectCurrentQuestion,
  selectCurrentAnswer,
  (question, answer) => ({ question, answer }),
);

