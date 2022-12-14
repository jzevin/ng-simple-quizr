export type QuizStatePanels = 'intro' | 'questions' | 'results';

export type QuizThemes = 'light' | 'dark';

export type QuizState = {
  questions: ReadonlyArray<QuizQuestion>,
  answers: QuizAnswers,
  currentQuestionIndex: number,
  errors: Error[],
  isLoading: boolean,
  theme: QuizThemes,
  zoom: number,
  panel: QuizStatePanels,
  quizOptions: QuizOptions,
  quizSessionId: string
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