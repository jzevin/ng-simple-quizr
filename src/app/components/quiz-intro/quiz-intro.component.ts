import { Component, OnInit } from '@angular/core';

import { QuizStatePanels } from 'src/app/models/quiz.models';
import { Store } from '@ngrx/store';
import { quizActions } from 'src/app/state/quiz.state.actions';

@Component({
  selector: 'qzr-quiz-intro',
  templateUrl: './quiz-intro.component.html',
  styleUrls: ['./quiz-intro.component.scss']
})
export class QuizIntroComponent {

  vm = {
    options: {
      numberOfQuestions: 20,
      shouldRandomize: true,
    }
  }
  constructor(private store: Store) {
    //
  }

  onSubmit() {
    this.store.dispatch(quizActions.setQuizOptions({ payload: this.vm.options }));
    this.store.dispatch(quizActions.setQuizPanel({ payload: 'questions' }));
  }

}
