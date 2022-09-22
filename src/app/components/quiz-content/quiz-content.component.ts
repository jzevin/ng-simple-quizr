import { Observable, combineLatest } from 'rxjs';
import { selectCurrentAnswer, selectCurrentQuestion } from '../../state/quiz.state.selectors';

import { Component } from '@angular/core';
import { QuizQuestion } from 'src/app/models/quiz.models';
import { Store } from '@ngrx/store';
import { quizActions } from '../../state/quiz.state.actions';

@Component({
  selector: 'qzr-quiz-content',
  templateUrl: './quiz-content.component.html',
  styleUrls: ['./quiz-content.component.scss']
})
export class QuizContentComponent {

  readonly currentQuestion$: Observable<QuizQuestion> = this.store.select(selectCurrentQuestion);
  readonly currentAnswer$ = this.store.select(selectCurrentAnswer);
  readonly vm$ = combineLatest({question: this.currentQuestion$, answer: this.currentAnswer$});
  
  constructor(private store: Store) {}

  onClickAnswer(answerIndex: number, isLocked: boolean) {
    isLocked || this.store.dispatch(quizActions.answerQuestion({ payload: answerIndex }));
  }

  onClickLockAnswer() {
    this.store.dispatch(quizActions.lockAnswer());
  }

  getAnswerClass(vm: any) {
    if (!vm.answer.isLocked) {
      return '';
    }
    return vm.question.answerIndex === vm.answer.answerIndex ? 'correct' : 'incorrect';
  }

}
