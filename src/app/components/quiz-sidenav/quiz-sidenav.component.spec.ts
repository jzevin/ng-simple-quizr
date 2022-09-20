import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { QuizAnswers, QuizQuestion, QuizState } from 'src/app/models/quiz.models';
import {
    selectAllQuestions,
    selectAnswers,
    selectCurrentQuestionIndex
} from 'src/app/state/quiz.state.selectors';

import { MemoizedSelector } from '@ngrx/store';
import { QuizSidenavComponent } from './quiz-sidenav.component';
import { QuizStateTestFixture } from '../../testing/quiz.state.fixtures';

describe('QuizSidenavComponent', () => {
  let component: QuizSidenavComponent;
  let fixture: ComponentFixture<QuizSidenavComponent>;
  let el: HTMLElement;
  let mockStore: MockStore;
  let mockCurrentQuestionIndex: MemoizedSelector<QuizState, number>;
  let mockSelectAllQuestions: MemoizedSelector<QuizState, Readonly<QuizQuestion[]>>
  let mockSelectAnswers: MemoizedSelector<QuizState, QuizAnswers>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizSidenavComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    mockCurrentQuestionIndex = mockStore.overrideSelector(
      selectCurrentQuestionIndex,
      0
    ); 
    mockSelectAllQuestions = mockStore.overrideSelector(
      selectAllQuestions,
      [...QuizStateTestFixture.questions]
    );
    mockSelectAnswers = mockStore.overrideSelector(
      selectAnswers,
      {...QuizStateTestFixture.answers}
    );
    fixture = TestBed.createComponent(QuizSidenavComponent);
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

  it('should have a questions$ property that emits an array of two questions', () => {
    expect(component.questions$).toBeTruthy();
    component.questions$.subscribe(questions => {
      expect(questions).toEqual(QuizStateTestFixture.questions);
    })
  });

  it('should have a answers$ property that emits a answers object', () => {
    expect(component.answers$).toBeTruthy();
    component.answers$.subscribe(answers => {
      expect(answers).toEqual(QuizStateTestFixture.answers);
    })
  });

  it('should have a currentIndex$ property that emits a zero', () => {
    expect(component.currentIndex$).toBeTruthy();
    component.currentIndex$.subscribe(currentIndex => {
      expect(currentIndex).toBe(0);
    })
  });

  it('should have two .question elements and the first should have an active class until currentQuestionIndex is changed on the state and then the second .question el should have the .active class', () => {
    const questionElements = el.querySelectorAll('.question');
    expect(questionElements.length).toBe(2);
    expect(questionElements[0]).toHaveClass('active');
    expect(questionElements[1]).not.toHaveClass('active');
    // now change the index on state
    mockCurrentQuestionIndex.setResult(1);
    mockStore.refreshState();
    fixture.detectChanges();
    expect(questionElements.length).toBe(2);
    expect(questionElements[0]).not.toHaveClass('active');
    expect(questionElements[1]).toHaveClass('active');
  });

  it('should call onClickQuestion method when .question elements are clicked', () => {
    const compSpy = spyOn(component, 'onClickQuestion');
    const questionElements = el.querySelectorAll('.question');
    questionElements.forEach((el) => (el as HTMLLIElement).click())
    fixture.detectChanges();
    expect(compSpy).toHaveBeenCalledTimes(2);
  });

  it('should dispatch "[User] Select question by index" when clicked', () => {
    const questionElements = el.querySelectorAll('.question');
    const q1 = questionElements[1] as HTMLLIElement;
    q1.click();
    fixture.detectChanges();
    mockStore.scannedActions$.subscribe(action => {
      expect(action.type).toBe('[User] Select question by index');
    })
  });

  it('should have the text "Question #1" on the first .question element', () => {
    const questionElements = el.querySelectorAll('.question');
    const question = questionElements[0] as HTMLLIElement;
    expect(question.textContent).toBe('Question #1');
  });

  it('should have the text "Question #2" on the second .question element', () => {
    const questionElements = el.querySelectorAll('.question');
    const question = questionElements[1] as HTMLLIElement;
    expect(question.textContent).toBe('Question #2');
  });

  it('should display the "correct" icon when the question is answered correctly', () => {
    const questionElements = el.querySelectorAll('.question');
    const question = questionElements[0] as HTMLLIElement;
    // mock the correct state
    mockSelectAnswers.setResult({
      ...QuizStateTestFixture.answers,
      y5lv4glt9gyrpys40y: {
        answerIndex: 0,
        isLocked: true,
        isCorrect: true
      }
    });
    mockStore.refreshState();
    fixture.detectChanges();
    expect(question.textContent).toBe('Question #1✅');
    // mock the incorrect state
    mockSelectAnswers.setResult({
      ...QuizStateTestFixture.answers,
      y5lv4glt9gyrpys40y: {
        answerIndex: 0,
        isLocked: true,
      }
    });
    mockStore.refreshState();
    fixture.detectChanges();
    expect(question.textContent).toBe('Question #1❌');
  });
});
