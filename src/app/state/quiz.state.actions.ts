import { createAction, props } from "@ngrx/store";

import { QuizQuestion } from "../models/quiz.models";

export const quizActions = {
  loadQuestions: createAction('[App] Load questions'),
  loadQuestionsSuccess: createAction('[App] Load questions success', props<{payload: ReadonlyArray<QuizQuestion>}>()),
  loadQuestionsFailure: createAction('[App] Load questions failure', props<{payload: Error}>()),
}