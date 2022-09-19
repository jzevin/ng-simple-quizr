import { Component, OnInit } from '@angular/core';

import { QuizOptions } from 'src/app/models/quiz.models';
import { Store } from '@ngrx/store';
import { quizActions } from 'src/app/state/quiz.state.actions';
import { selectQuizOptions } from 'src/app/state/quiz.state.selectors';
import { take } from 'rxjs';

@Component({
  selector: 'qzr-quiz-intro',
  templateUrl: './quiz-intro.component.html',
  styleUrls: ['./quiz-intro.component.scss']
})
export class QuizIntroComponent implements OnInit {

  vm = {
    options: {} as QuizOptions,
  }
  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(selectQuizOptions).pipe(take(1)).subscribe((options) => {
      this.vm.options = {...options};
    });
  }

  onSubmit() {
    this.store.dispatch(quizActions.setQuizOptions({ payload: this.vm.options }));
    this.store.dispatch(quizActions.setQuizPanel({ payload: 'questions' }));
    this.store.dispatch(quizActions.loadQuestions());
  }

}
