import { Component, OnInit } from '@angular/core';
import { QuizQuestion, QuizState } from 'src/app/models/quiz.models';
import { selectCurrentQuestion, selectCurrentQuestionIndex, selectQuizState } from '../../state/quiz.state.selectors';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { quizActions } from '../../state/quiz.state.actions';

@Component({
  selector: 'qzr-quiz-content',
  templateUrl: './quiz-content.component.html',
  styleUrls: ['./quiz-content.component.scss']
})
export class QuizContentComponent implements OnInit {

  currentQuestion$: Observable<QuizQuestion> = this.store.select(selectCurrentQuestion);
  currentQuestionIndex$: Observable<number> = this.store.select(selectCurrentQuestionIndex);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(quizActions.loadQuestions());
  }

}
