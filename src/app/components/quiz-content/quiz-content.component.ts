import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { QuizState } from 'src/app/models/quiz.models';
import { Store } from '@ngrx/store';
import { quizActions } from '../../state/quiz.state.actions';
import { selectQuizState } from '../../state/quiz.state.selectors';

@Component({
  selector: 'qzr-quiz-content',
  templateUrl: './quiz-content.component.html',
  styleUrls: ['./quiz-content.component.scss']
})
export class QuizContentComponent implements OnInit {

  quizState$: Observable<QuizState> = this.store.select(selectQuizState);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(quizActions.loadQuestions());
  }

}
