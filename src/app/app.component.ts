import { Component, HostBinding } from '@angular/core';

import { Store } from '@ngrx/store';
import { selectTheme } from './state/quiz.state.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class') themeClass = '';
  selectedTheme$ = this.store.select(selectTheme)
  constructor(private store: Store) {
    this.selectedTheme$.subscribe((theme) => (this.themeClass = `theme-${theme}`));
  }
}
