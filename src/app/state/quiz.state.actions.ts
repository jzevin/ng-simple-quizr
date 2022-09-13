import { createAction, props } from "@ngrx/store";

import { QuizQuestion } from "../models/quiz.models";

export const quizActions = {
  loadQuestions: createAction('[App] Load questions'),
  loadQuestionsSuccess: createAction('[App] Load questions success', props<{payload: ReadonlyArray<QuizQuestion>}>()),
  loadQuestionsFailure: createAction('[App] Load questions failure', props<{payload: Error}>()),
  selectQuestionByIndex: createAction('[Quiz Overview] Select question by index', props<{payload: number}>()),
  answerQuestion: createAction('[App] Answer question', props<{payload: {questionIndex: number, answerIndex: number}}>()),
  resetQuiz: createAction('[App] Reset quiz'),
  previousQuestion: createAction('[Quiz Nav] Previous question'),
  nextQuestion: createAction('[Quiz Nav] Next question'),
  setTheme: createAction('[App] Set theme', props<{payload: 'light' | 'dark'}>()),
  setZoom: createAction('[App] Set zoom'),
}