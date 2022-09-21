import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { QuizQuestion, QuizState } from 'src/app/models/quiz.models';

import { MemoizedSelector } from '@ngrx/store';
import { QuizComponent } from './quiz.component';
import { QuizContentComponent } from '../quiz-content/quiz-content.component';
import { QuizInfoComponent } from '../quiz-info/quiz-info.component';
import { QuizNavComponent } from '../quiz-nav/quiz-nav.component';
import { QuizSidenavComponent } from '../quiz-sidenav/quiz-sidenav.component';
import { QuizStateTestFixture } from 'src/app/testing/quiz.state.fixtures';
import { selectAllQuestions } from 'src/app/state/quiz.state.selectors';
import { selectIsLoading } from '../../state/quiz.state.selectors';

fdescribe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  let el: HTMLElement;
  let mockStore: MockStore;
  let mockSelectAllQuestions: MemoizedSelector<QuizState, readonly QuizQuestion[]>;
  let mockSelectIsLoading: MemoizedSelector<QuizState, boolean>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        QuizComponent,
        QuizNavComponent,
        QuizSidenavComponent,
        QuizContentComponent,
        QuizInfoComponent,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    mockSelectAllQuestions = mockStore.overrideSelector(
      selectAllQuestions,
      QuizStateTestFixture.questions
    ); 
    mockSelectIsLoading = mockStore.overrideSelector(
      selectIsLoading,
      false
    ); 
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    mockStore.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a questions$ property', () => {
    expect(component.questions$).toBeTruthy();
  });

  it('should have a isLoading$ property', () => {
    expect(component.isLoading$).toBeTruthy();
  });

  it('should NOT have a .loading element when isLoading is false', () => {
    const loadingEl = el.querySelector('.loading');
    expect(loadingEl).toBeFalsy();
  });
  
  it('should have a .loading element when isLoading is true', () => {
    mockSelectIsLoading.setResult(true);
    mockStore.refreshState();
    fixture.detectChanges();
    const loadingEl = el.querySelector('.loading');
    expect(loadingEl).toBeTruthy();
  });

  it('should have a .main element when there is at least one question', () => {
    const mainEl = el.querySelector('.main');
    expect(mainEl).toBeTruthy();
  });

  it('should have NOT have a .main element when there are no questions', () => {
    mockSelectAllQuestions.setResult([]);
    mockStore.refreshState();
    fixture.detectChanges();
    const mainEl = el.querySelector('.main');
    expect(mainEl).toBeFalsy();
  });

  it('should have an onKeyup method', () => {
    expect(component.onKeyup).toBeTruthy();
  });

  it('should dispatch "[User] Next question" when the right arrow is pressed and released', () => {
    window.dispatchEvent(new KeyboardEvent('keyup', {
      key: 'ArrowRight'
    }));
    fixture.detectChanges();
    mockStore.scannedActions$.subscribe(action => {
      expect(action.type).toBe('[User] Next question');
    });
  });

  it('should dispatch "[User] Previous question" when the left arrow is pressed and released', () => {
    window.dispatchEvent(new KeyboardEvent('keyup', {
      key: 'ArrowLeft'
    }));
    fixture.detectChanges();
    mockStore.scannedActions$.subscribe(action => {
      expect(action.type).toBe('[User] Previous question');
    });
  });

});
