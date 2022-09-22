import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { QuizQuestion, QuizState } from 'src/app/models/quiz.models';

import { DebugElement } from '@angular/core';
import { MemoizedSelector } from '@ngrx/store';
import { QuizContentComponent } from './quiz-content.component';
import { QuizStateTestFixture } from '../../testing/quiz.state.fixtures';
import { selectCurrentAnswer } from '../../state/quiz.state.selectors';
import { selectCurrentQuestion } from 'src/app/state/quiz.state.selectors';

const answer = QuizStateTestFixture.answers[QuizStateTestFixture.questions[0].id];

describe('QuizContentComponent', () => {
  let component: QuizContentComponent;
  let fixture: ComponentFixture<QuizContentComponent>;
  let elDebug: DebugElement;
  let el: HTMLElement;
  let mockStore: MockStore;
  let mockSelectCurrentQuestion: MemoizedSelector<QuizState, QuizQuestion>;
  let mockSelectCurrentAnswer: MemoizedSelector<QuizState, typeof answer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizContentComponent],
      providers: [
        provideMockStore(),
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    mockSelectCurrentQuestion = mockStore.overrideSelector(
      selectCurrentQuestion,
      QuizStateTestFixture.questions[0]
    ); 
    mockSelectCurrentAnswer = mockStore.overrideSelector(
      selectCurrentAnswer,
      QuizStateTestFixture.answers[QuizStateTestFixture.questions[0].id]
    ); 
    fixture = TestBed.createComponent(QuizContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
    elDebug = fixture.debugElement;
  });

  afterEach(() => {
    mockStore.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a currentQuestion$ property', () => {
    expect(component.currentQuestion$).toBeTruthy();
  });

  it('should have a currentQuestion$ property', () => {
    expect(component.currentQuestion$).toBeTruthy();
  });

  it('should have a vm$ property', () => {
    expect(component.vm$).toBeTruthy();
  });

  it('should have an element with a "question" class when there is a vm with currentQuestion and currentAnswer', () => {
    expect(el.querySelector('.question')).toBeTruthy();
  });

  it('should NOT have an element with a "question" class when there is no vm', () => {
    mockSelectCurrentQuestion.setResult(undefined);
    mockSelectCurrentAnswer.setResult(undefined);
    mockStore.refreshState();
    fixture.detectChanges();
    expect(el.querySelector('.question')).toBeFalsy();
  });

  it('should have a .subject element with the text "math"', () => {
    const subjectEl = el.querySelector('.subject');
    expect(subjectEl?.textContent).toBe('math');
  });

  it('should have a .question-text element with the text "What is 7 times 6?"', () => {
    const element = el.querySelector('.question-text');
    expect(element?.textContent).toBe('What is 7 times 6?');
  });

  it('should have a .options element', () => {
    const element = el.querySelector('.options');
    expect(element?.textContent).toBeTruthy();
  });

  it('should have a .options element with 4 .option elements', () => {
    const optionElement = el.querySelector('.options');
    expect(optionElement?.textContent).toBeTruthy();
    const optionElements = el.querySelectorAll('.option');
    expect(optionElements?.length).toBe(4);
  });

  it('should 4 .option elements and the first should have no extra classes', () => {
    const optionElements = el.querySelectorAll('.option');
    expect(optionElements[0].classList.toString()).toEqual('option');
  });

  it('should have 4 .option elements and the first should have classes "option locked incorrect"', () => {
    mockSelectCurrentAnswer.setResult(
      {
        ...answer,
        isLocked: true
      }
    );
    mockStore.refreshState();
    fixture.detectChanges();
    const optionElements = el.querySelectorAll('.option');
    expect(optionElements[0].classList.toString()).toEqual('option locked incorrect');
  });

  it('should have 4 .option elements and the first should have classes "option locked picked correct"', () => {
    mockSelectCurrentAnswer.setResult(
      {
        ...answer,
        answerIndex: 0,
        isLocked: true
      }
    );
    mockStore.refreshState();
    fixture.detectChanges();
    const optionElements = el.querySelectorAll('.option');
    expect(optionElements[0].classList.toString()).toEqual('option locked picked correct');
  });

  it('should have have an onClickAnswer method and be called 4 times with the right args', () => {
    const compSpy = spyOn(component, 'onClickAnswer');
    const optionElements = el.querySelectorAll('.option');
    optionElements.forEach((el, index) => {
      (el as HTMLLIElement).click();
      expect(compSpy).toHaveBeenCalledWith(index, false);
    })
    expect(compSpy).toHaveBeenCalledTimes(4);
  });

  it('should have have an onClickAnswer method and and return since isLocked', () => {
    mockSelectCurrentAnswer.setResult(
      {
        ...answer,
        answerIndex: 0,
        isLocked: true
      }
    );
    mockStore.refreshState();
    fixture.detectChanges();
    const compSpy = spyOn(component, 'onClickAnswer');
    const optionElement = el.querySelectorAll('.option')[0];
    (optionElement as HTMLLIElement).click();
    expect(compSpy).toHaveBeenCalledWith(0, true)
    expect(compSpy).toHaveBeenCalled();
  });

  it('should call onClickAnswer and dispatch "[User] Answer question"', () => {
    const optionElements = el.querySelectorAll('.option');
    (optionElements[0] as HTMLLIElement).click();
    mockStore.scannedActions$.subscribe(action => {
      expect(action.type).toBe('[User] Answer question');
    })
  });

  it('should have have an .answer-lock element with a button element', () => {
    const buttonEL = el.querySelectorAll('.answer-lock button');
    expect(buttonEL).toBeTruthy();
  });

  it('should have have an .answer-lock element with a button element that call onClickLockAnswer', () => {
    const compSpy = spyOn(component, 'onClickLockAnswer');
    const buttonEL = el.querySelector('.answer-lock button');
    (buttonEL as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(compSpy).not.toHaveBeenCalled(); // button is disabled because no answer has been selected
    mockSelectCurrentAnswer.setResult(
      {
        ...answer,
        answerIndex: 0
      }
    );
    mockStore.refreshState();
    fixture.detectChanges();
    (buttonEL as HTMLButtonElement).click();
    expect(compSpy).toHaveBeenCalled();
  });

  it('should call onClickLockAnswer and dispatch "[User] Lock answer"', () => {
    mockSelectCurrentAnswer.setResult(
      {
        ...answer,
        answerIndex: 0
      }
    );
    mockStore.refreshState();
    fixture.detectChanges();
    const lockBtn = el.querySelector('.answer-lock-btn');
    (lockBtn as HTMLLIElement).click();
    mockStore.scannedActions$.subscribe(action => {
      expect(action.type).toBe('[User] Lock answer');
    })
  });

  it('should not have a .result element', () => {
    const resultEl = el.querySelector('.result');
    expect(resultEl).toBeFalsy();
  });

  it('should have a .result element and', () => {
    mockSelectCurrentAnswer.setResult(
      {
        ...answer,
        isLocked: true
      }
    );
    mockStore.refreshState();
    fixture.detectChanges();
    const resultEl = el.querySelector('.result');
    expect(resultEl).toBeTruthy();
  });

  it('should have a .result element and a .correct-result element and no .wrong-answer element', () => {
    mockSelectCurrentAnswer.setResult(
      {
        ...answer,
        isLocked: true,
        isCorrect: true
      }
    );
    mockStore.refreshState();
    fixture.detectChanges();
    const resultEl = el.querySelector('.result');
    const correctEl = el.querySelector('.correct-result');
    const wrongEl = el.querySelector('.wrong-result');
    expect(resultEl).toBeTruthy();
    expect(correctEl).toBeTruthy();
    expect(wrongEl).toBeFalsy();
  });

  it('should have a .result element and a .wrong-result element and no .correct-result element', () => {
    mockSelectCurrentAnswer.setResult(
      {
        ...answer,
        isLocked: true,
      }
    );
    mockStore.refreshState();
    fixture.detectChanges();
    const resultEl = el.querySelector('.result');
    const correctEl = el.querySelector('.correct-result');
    const wrongEl = el.querySelector('.wrong-result');
    expect(resultEl).toBeTruthy();
    expect(wrongEl).toBeTruthy();
    expect(correctEl).toBeFalsy();
  });
});
