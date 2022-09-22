import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { DebugElement } from '@angular/core';
import { MemoizedSelector } from '@ngrx/store';
import { QuizInfoComponent } from '../quiz-info/quiz-info.component';
import { QuizNavComponent } from './quiz-nav.component';
import { QuizState } from 'src/app/models/quiz.models';
import { QuizStateTestFixture } from 'src/app/testing/quiz.state.fixtures';
import { selectQuizState } from '../../state/quiz.state.selectors';

describe('QuizNavComponent', () => {
  let component: QuizNavComponent;
  let fixture: ComponentFixture<QuizNavComponent>;
  let elDebug: DebugElement;
  let el: HTMLElement;
  let mockStore: MockStore;
  let mockSelectQuizState: MemoizedSelector<QuizState, QuizState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizNavComponent, QuizInfoComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    mockSelectQuizState = mockStore.overrideSelector(
      selectQuizState,
      QuizStateTestFixture
    );
    fixture = TestBed.createComponent(QuizNavComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement as HTMLElement;
    elDebug = fixture.debugElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    mockStore.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a quizInfo component', () => {
    expect(el.querySelector('qzr-quiz-info')).toBeTruthy();
  });

  it('should have a button with a "prev" class', () => {
    expect(el.querySelector('button.prev')).toBeTruthy();
  });

  it('should have a button with a "prev" class that is disabled', () => {
    const prevBtn = el.querySelector('button.prev') as HTMLButtonElement;
    expect(prevBtn.disabled).toBeTruthy();
  });

  it('should have a button with a "next" class', () => {
    expect(el.querySelector('button.next')).toBeTruthy();
  });

  it('should have a button with a "next" class that is NOT disabled', () => {
    const nextBtn = el.querySelector('button.next') as HTMLButtonElement;
    expect(nextBtn.disabled).toBeFalsy();
  });

  it('should have an onClickPrevious method and be called once', () => {
    mockSelectQuizState.setResult({
      ...QuizStateTestFixture,
      currentQuestionIndex: 1,
    });
    mockStore.refreshState();
    fixture.detectChanges();
    const compSpy = spyOn(component, 'onClickPrevious');
    const prevBtn = el.querySelector('.prev');
    (prevBtn as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(compSpy).toHaveBeenCalled();
  });

  it('should call onClickPrevious and dispatch "[User] Previous question"', () => {
    mockSelectQuizState.setResult({
      ...QuizStateTestFixture,
      currentQuestionIndex: 1,
    });
    mockStore.refreshState();
    fixture.detectChanges();
    const button = el.querySelector('.prev');
    (button as HTMLButtonElement).click();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toBe('[User] Previous question');
    });
  });

  it('should have an onClickNext method and be called once', () => {
    const compSpy = spyOn(component, 'onClickNext');
    const prevBtn = el.querySelector('.next');
    (prevBtn as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(compSpy).toHaveBeenCalled();
  });

  it('should call onClickNext and dispatch "[User] Next question"', () => {
    const button = el.querySelector('.next');
    (button as HTMLButtonElement).click();
    mockStore.scannedActions$.subscribe((action) => {
      expect(action.type).toBe('[User] Next question');
    });
  });
});
