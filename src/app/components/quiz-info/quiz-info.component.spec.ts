import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { QuizQuestion, QuizState } from 'src/app/models/quiz.models';
import { selectAllQuestions, selectCurrentQuestionIndex } from 'src/app/state/quiz.state.selectors';

import { MemoizedSelector } from '@ngrx/store';
import { QuizInfoComponent } from './quiz-info.component';
import { QuizStateTestFixture } from 'src/app/testing/quiz.state.fixtures';

describe('QuizInfoComponent', () => {
  let component: QuizInfoComponent;
  let fixture: ComponentFixture<QuizInfoComponent>;
  let el: HTMLElement;
  let mockStore: MockStore;
  let mockSelectCurrentQuestionIndex: MemoizedSelector<QuizState, number>;
  let mockSelectAllQuestions: MemoizedSelector<QuizState, readonly QuizQuestion[]>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizInfoComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    mockSelectCurrentQuestionIndex = mockStore.overrideSelector(
      selectCurrentQuestionIndex,
      0
    ); 
    mockSelectAllQuestions = mockStore.overrideSelector(
      selectAllQuestions,
      QuizStateTestFixture.questions
    ); 
    fixture = TestBed.createComponent(QuizInfoComponent);
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

  it('should have a currentQuestionNumber$ property', () => {
    expect(component.currentQuestionNumber$).toBeTruthy();
  });

  it('should have a totalQuestions$ property', () => {
    expect(component.totalQuestions$).toBeTruthy();
  });

  it('should have display the "1 of 2"', () => {
    expect(el.textContent).toEqual("1 of 2")
  });

  it('should have display the "2 of 2"', () => {
    mockSelectCurrentQuestionIndex.setResult(1);
    mockStore.refreshState();
    fixture.detectChanges();
    expect(el.textContent).toEqual("2 of 2")
  });
});
