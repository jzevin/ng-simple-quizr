import { QuizAnswers, QuizQuestion, QuizState } from 'src/app/models/quiz.models';

import { initialQuizState } from '../state/quiz.state.reducers';

const questions = [{
  subject: 'math',
  question: 'What is 7 times 6?',
  options: [
    '42',
    '36',
    '49',
    '14'
  ],
  answerIndex: 0,
  id: 'y5lv4glt9gyrpys40y'
},
{
  subject: 'geography',
  question: 'Which river forms the border between India and Bangladesh? ',
  options: [
    'Ganges River',
    'Indus River',
    'Brahmaputra River'
  ],
  answerIndex: 2,
  id: 'iiclv88q8hmt79hu8m'
}] as ReadonlyArray<QuizQuestion>;

const answers = {
  y5lv4glt9gyrpys40y: {
    answerIndex: -1
  },
  iiclv88q8hmt79hu8m: {
    answerIndex: -1
  },
} as QuizAnswers;

export const QuizStateTestFixture = {
  ...initialQuizState,
  questions: [...questions],
  answers,
} as QuizState;