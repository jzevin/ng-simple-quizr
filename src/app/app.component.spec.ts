import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { QuizState, QuizStatePanels, QuizThemes } from './models/quiz.models';
import { selectPanel, selectTheme, selectZoom } from './state/quiz.state.selectors';

import { AppComponent } from './app.component';
import { AppErrorsComponent } from './components/app-errors/app-errors.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { DebugElement } from '@angular/core';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizContentComponent } from './components/quiz-content/quiz-content.component';
import { QuizInfoComponent } from './components/quiz-info/quiz-info.component';
import { QuizIntroComponent } from './components/quiz-intro/quiz-intro.component';
import { QuizNavComponent } from './components/quiz-nav/quiz-nav.component';
import { QuizSidenavComponent } from './components/quiz-sidenav/quiz-sidenav.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let elDebug: DebugElement;
  let el: HTMLElement;
  let mockStore: MockStore;
  let mockSelectZoom: MemoizedSelector<QuizState, number>;
  let mockSelectTheme: MemoizedSelector<QuizState, QuizThemes>;
  let mockSelectPanel: MemoizedSelector<QuizState, QuizStatePanels>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot({})],
declarations: [
        AppComponent,
        QuizComponent,
        AppHeaderComponent,
        AppErrorsComponent,
        QuizSidenavComponent,
        QuizNavComponent,
        QuizContentComponent,
        QuizInfoComponent,
        QuizIntroComponent
      ],
      providers: [
        provideMockStore(),
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    mockSelectZoom = mockStore.overrideSelector(
      selectZoom,
      1
    );
    mockSelectTheme = mockStore.overrideSelector(
      selectTheme,
      'light'
    );
    mockSelectPanel = mockStore.overrideSelector(
      selectPanel,
      'intro'
    );
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
    elDebug = fixture.debugElement;
  });

  afterEach(() => {
    mockStore.resetSelectors();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
