export type QuizState = {
  questions: ReadonlyArray<QuizQuestion>,
  currentQuestionIndex: number,
  error: Error | null,
  loading: boolean,
}

export type QuizQuestion = {
  id: string,
  subject: string,
  question: string,
  options: string[],
  answerIndex: number
}