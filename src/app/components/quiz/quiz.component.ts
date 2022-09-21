import { Component, HostBinding, HostListener, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { quizActions } from 'src/app/state/quiz.state.actions';
import { selectAllQuestions } from 'src/app/state/quiz.state.selectors';
import { selectIsLoading } from '../../state/quiz.state.selectors';

@Component({
  selector: 'qzr-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  readonly questions$ = this.store.select(selectAllQuestions);
  readonly isLoading$ = this.store.select(selectIsLoading);

  constructor(private store: Store) {}

  @HostListener('window:keyup', ['$event']) onKeyup(event: KeyboardEvent) {
    const key = event.key;
    if (key === 'ArrowRight') {
      this.store.dispatch(quizActions.nextQuestion());
    }
    if (key === 'ArrowLeft') {
      this.store.dispatch(quizActions.previousQuestion());
    }
  }

}
