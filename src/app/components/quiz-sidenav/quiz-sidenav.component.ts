import { Component, OnInit } from '@angular/core';
import { selectAllQuestions, selectCurrentQuestionIndex } from 'src/app/state/quiz.state.selectors';

import { Store } from '@ngrx/store';
import { quizActions } from '../../state/quiz.state.actions';
import { selectAnswers } from '../../state/quiz.state.selectors';

@Component({
  selector: 'qzr-quiz-sidenav',
  templateUrl: './quiz-sidenav.component.html',
  styleUrls: ['./quiz-sidenav.component.scss']
})
export class QuizSidenavComponent {

  readonly questions$ = this.store.select(selectAllQuestions);
  readonly answers$ = this.store.select(selectAnswers);
  readonly currentIndex$ = this.store.select(selectCurrentQuestionIndex);

  constructor(private store: Store) {}

  onClickQuestion(index: number) {
    this.store.dispatch(quizActions.selectQuestionByIndex({ payload: index }));
  }
}
