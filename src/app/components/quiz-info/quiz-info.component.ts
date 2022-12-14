import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { selectAllQuestions, selectCurrentQuestionIndex } from 'src/app/state/quiz.state.selectors';

import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'qzr-quiz-info',
  templateUrl: './quiz-info.component.html',
  styleUrls: ['./quiz-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizInfoComponent {

  readonly currentQuestionNumber$ = this.store.select(selectCurrentQuestionIndex).pipe(map((index) => index + 1));
  readonly totalQuestions$ = this.store.select(selectAllQuestions).pipe(map((questions) => questions.length));

  constructor(private store: Store) {}

}
