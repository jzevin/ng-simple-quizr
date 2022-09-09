export type QuizState = {
  questions: ReadonlyArray<QuizQuestion>,
  error: Error | null,
  loading: boolean,
}

export type QuizQuestion = {
  id: number,
  subject: string,
  question: string,
  options: string[],
  answerIndex: number
}