import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { quizActions } from 'src/app/state/quiz.state.actions';
import { selectTheme } from '../../state/quiz.state.selectors';

@Component({
  selector: 'qzr-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnDestroy, OnInit {
  theme = '';
  currentThemeSub$ = this.store.select(selectTheme).subscribe((theme) => this.theme = theme);
  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  onClickToggleTheme() {
    this.store.dispatch(quizActions.setTheme({ payload: this.theme === 'light' ? 'dark' : 'light' }));
  }

  ngOnDestroy() {
    this.currentThemeSub$.unsubscribe();
  }

  onClickZoom() {
    this.store.dispatch(quizActions.setZoom());
  }
}
