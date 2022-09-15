import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, forkJoin, merge, mergeAll } from 'rxjs';
import { selectCurrentAnswer, selectCurrentQuestion, selectCurrentQuestionAndAnswer } from '../../state/quiz.state.selectors';

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
  vm$ = combineLatest({question: this.currentQuestion$, answer: this.currentAnswer$});
  
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(quizActions.loadQuestions());
  }

  onClickAnswer(answerIndex: number, isLocked: boolean) {
    if (isLocked) {
      return;
    }
    this.store.dispatch(quizActions.answerQuestion({ payload: answerIndex }));
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
