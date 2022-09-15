import { Component, OnInit } from '@angular/core';
import { selectAllQuestions, selectCurrentQuestionIndex } from 'src/app/state/quiz.state.selectors';

import { Store } from '@ngrx/store';
import { quizActions } from '../../state/quiz.state.actions';

@Component({
  selector: 'qzr-quiz-sidenav',
  templateUrl: './quiz-sidenav.component.html',
  styleUrls: ['./quiz-sidenav.component.scss']
})
export class QuizSidenavComponent implements OnInit {

  questions$ = this.store.select(selectAllQuestions);
  currentIndex$ = this.store.select(selectCurrentQuestionIndex);

  constructor(private store: Store) {}

  ngOnInit(): void {
  }

  onClickQuestion(index: number) {
    this.store.dispatch(quizActions.selectQuestionByIndex({ payload: index }));
  }

}
