import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { selectPanel, selectTheme, selectZoom } from './state/quiz.state.selectors';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  selectedTheme$ = this.store.select(selectTheme).pipe(map(theme => (`theme-${theme}`)));
  zoom$ = this.store.select(selectZoom).pipe(map(zoom => (`font-size: ${zoom}em;`)));
  panel$ = this.store.select(selectPanel);
  vm$ = combineLatest(
    {
      theme: this.selectedTheme$,
      zoom: this.zoom$,
      panel: this.panel$
    }
  );

  constructor(private store: Store) {}
}
