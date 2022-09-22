import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { quizActions } from 'src/app/state/quiz.state.actions';
import { selectQuizOptions } from 'src/app/state/quiz.state.selectors';

@Component({
  selector: 'qzr-quiz-intro',
  templateUrl: './quiz-intro.component.html',
  styleUrls: ['./quiz-intro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizIntroComponent {
  QuizOptions$ = this.store.select(selectQuizOptions);

  constructor(private store: Store) {}

  onSubmit(numberOfQuestions: string, shouldRandomize: boolean) {
    this.store.dispatch(
      quizActions.setQuizOptions({
        payload: {
          numberOfQuestions: +numberOfQuestions,
          shouldRandomize,
        },
      })
    );
  }
}
