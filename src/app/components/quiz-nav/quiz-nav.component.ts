import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { quizActions } from '../../state/quiz.state.actions';
import { selectQuizState } from '../../state/quiz.state.selectors';

@Component({
  selector: 'qzr-quiz-nav',
  templateUrl: './quiz-nav.component.html',
  styleUrls: ['./quiz-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizNavComponent {
  hasPreviousQuestion$ = this.store.select(selectQuizState).pipe(map((state) => state.currentQuestionIndex > 0));
  hasNextQuestion$ = this.store.select(selectQuizState).pipe(map((state) => state.currentQuestionIndex < state.questions.length - 1));

  constructor(private store: Store) {}

  onClickPrevious() {
    this.store.dispatch(quizActions.previousQuestion());
  }

  onClickNext() {
    this.store.dispatch(quizActions.nextQuestion());
  }
}
