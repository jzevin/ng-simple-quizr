import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { quizActions } from 'src/app/state/quiz.state.actions';
import { selectErrors } from 'src/app/state/quiz.state.selectors';

@Component({
  selector: 'qzr-app-errors',
  templateUrl: './app-errors.component.html',
  styleUrls: ['./app-errors.component.scss']
})
export class AppErrorsComponent implements OnInit {
  errors$ = this.store.select(selectErrors);
  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  onClickClose(index: number) {
    this.store.dispatch(quizActions.closeError({ payload: index }));
  }

}
