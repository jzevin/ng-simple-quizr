export type QuizState = {
  questions: ReadonlyArray<QuizQuestion>,
  answers: QuizAnswers,
  currentQuestionIndex: number,
  errors: Error[],
  loading: boolean,
  theme: 'light' | 'dark',
  zoom: number,
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