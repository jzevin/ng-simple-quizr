import { Component, OnInit } from '@angular/core';
import { selectQuizState, selectQuizStateCurrentQuestion } from '../../state/quiz.state.selectors';

import { Observable } from 'rxjs';
import { QuizState } from 'src/app/models/quiz.models';
import { Store } from '@ngrx/store';
import { quizActions } from '../../state/quiz.state.actions';

@Component({
  selector: 'qzr-quiz-content',
  templateUrl: './quiz-content.component.html',
  styleUrls: ['./quiz-content.component.scss']
})
export class QuizContentComponent implements OnInit {

  quizState$: Observable<QuizState> = this.store.select(selectQuizState);
  currentQuestion$ = this.store.select(selectQuizStateCurrentQuestion);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(quizActions.loadQuestions());
  }

}
