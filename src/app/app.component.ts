import { Component, HostBinding } from '@angular/core';
import { selectTheme, selectZoom } from './state/quiz.state.selectors';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class') themeClass = '';
  @HostBinding('style.fontSize') fontSize = '1em';
  selectedTheme$ = this.store.select(selectTheme);
  zoom$ = this.store.select(selectZoom);

  constructor(private store: Store) {
    this.selectedTheme$.subscribe((theme) => (this.themeClass = `theme-${theme}`));
    this.zoom$.subscribe((zoom) => (this.fontSize = `${zoom}em`));
  }
}
