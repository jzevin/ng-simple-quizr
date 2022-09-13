import { Component, OnInit } from '@angular/core';
import { selectAllQuestions, selectCurrentQuestionIndex } from 'src/app/state/quiz.state.selectors';

import { Store } from '@ngrx/store';
import { quizActions } from '../../state/quiz.state.actions';

@Component({
  selector: 'qzr-quiz-overview',
  templateUrl: './quiz-overview.component.html',
  styleUrls: ['./quiz-overview.component.scss']
})
export class QuizOverviewComponent implements OnInit {

  questions$ = this.store.select(selectAllQuestions);
  currentIndex$ = this.store.select(selectCurrentQuestionIndex);

  constructor(private store: Store) {}

  ngOnInit(): void {
  }

  onClickQuestion(index: number) {
    this.store.dispatch(quizActions.selectQuestionByIndex({ payload: index }));
  }

}
