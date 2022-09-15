import { Component, OnInit } from '@angular/core';
import { selectCurrentAnswer, selectCurrentQuestion } from '../../state/quiz.state.selectors';

import { Observable } from 'rxjs';
import { QuizQuestion } from 'src/app/models/quiz.models';
import { Store } from '@ngrx/store';
import { quizActions } from '../../state/quiz.state.actions';

@Component({
  selector: 'qzr-quiz-content',
  templateUrl: './quiz-content.component.html',
  styleUrls: ['./quiz-content.component.scss']
})
export class QuizContentComponent implements OnInit {

  currentQuestion$: Observable<QuizQuestion> = this.store.select(selectCurrentQuestion);
  currentAnswer$ = this.store.select(selectCurrentAnswer);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(quizActions.loadQuestions());
  }

  onClickAnswer(answerIndex: number) {
    this.store.dispatch(quizActions.answerQuestion({ payload: answerIndex }));
  }

}
