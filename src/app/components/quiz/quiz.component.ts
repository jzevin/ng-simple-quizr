import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { quizActions } from 'src/app/state/quiz.state.actions';
import { selectAllQuestions } from 'src/app/state/quiz.state.selectors';

@Component({
  selector: 'qzr-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  questions$ = this.store.select(selectAllQuestions);
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(quizActions.loadQuestions());
  }

}
