export type QuizStatePanels = 'intro' | 'questions' | 'results';

export type QuizState = {
  questions: ReadonlyArray<QuizQuestion>,
  answers: QuizAnswers,
  currentQuestionIndex: number,
  errors: Error[],
  isLoading: boolean,
  theme: 'light' | 'dark',
  zoom: number,
  panel: QuizStatePanels,
  quizOptions: QuizOptions,
}

export type QuizQuestion = {
  id: string,
  subject: string,
  question: string,
  options: string[],
  answerIndex: number
}

export type QuizAnswers = {
  [key: QuizQuestion['id']]: {
    answerIndex: number,
    isLocked?: boolean,
    isCorrect?: boolean
  }
}

export type QuizOptions = {
  numberOfQuestions: number,
  shouldRandomize: boolean,
}