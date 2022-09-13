export type QuizState = {
  questions: ReadonlyArray<QuizQuestion>,
  currentQuestionIndex: number,
  error: Error | null,
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