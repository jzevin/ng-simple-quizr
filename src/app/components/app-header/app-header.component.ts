import { ChangeDetectionStrategy, Component } from '@angular/core';

import { QuizThemes } from 'src/app/models/quiz.models';
import { Store } from '@ngrx/store';
import { quizActions } from 'src/app/state/quiz.state.actions';
import { selectTheme } from '../../state/quiz.state.selectors';

@Component({
  selector: 'qzr-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent {
  currentTheme$ = this.store.select(selectTheme);
  constructor(private store: Store) {}

  onClickToggleTheme(theme: QuizThemes) {
    this.store.dispatch(quizActions.setTheme({ payload: theme === 'light' ? 'dark' : 'light' }));
  }

  onClickZoom() {
    this.store.dispatch(quizActions.setZoom());
  }

  onClickReset() {
    this.store.dispatch(quizActions.resetQuiz());
  }
}
