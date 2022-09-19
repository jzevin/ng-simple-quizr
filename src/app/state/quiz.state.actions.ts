import { QuizOptions, QuizQuestion, QuizStatePanels } from "../models/quiz.models";
import { createAction, props } from "@ngrx/store";

export const quizActions = {
  loadQuestions: createAction('[App] Load questions'),
  loadQuestionsSuccess: createAction('[App] Load questions success', props<{payload: ReadonlyArray<QuizQuestion>}>()),
  loadQuestionsFailure: createAction('[App] Load questions failure', props<{payload: Error}>()),
  selectQuestionByIndex: createAction('[User] Select question by index', props<{payload: number}>()),
  answerQuestion: createAction('[User] Answer question', props<{payload: number}>()),
  lockAnswer: createAction('[User] Lock answer',),
  resetQuiz: createAction('[User] Reset quiz'),
  previousQuestion: createAction('[User] Previous question'),
  nextQuestion: createAction('[User] Next question'),
  setTheme: createAction('[User] Set theme', props<{payload: 'light' | 'dark'}>()),
  setZoom: createAction('[User] Set zoom'),
  closeError: createAction('[User] Close error', props<{payload: number}>()),
  setQuizOptions: createAction('[User] Set number of questions', props<{payload: QuizOptions}>()),
  setQuizPanel: createAction('[App] Set quiz panel', props<{payload: QuizStatePanels}>()),
}