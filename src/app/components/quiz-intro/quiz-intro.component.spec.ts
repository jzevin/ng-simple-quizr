import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { QuizOptions, QuizState } from 'src/app/models/quiz.models';

import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MemoizedSelector } from '@ngrx/store';
import { QuizIntroComponent } from './quiz-intro.component';
import { QuizStateTestFixture } from 'src/app/testing/quiz.state.fixtures';
import { selectQuizOptions } from 'src/app/state/quiz.state.selectors';

describe('QuizIntroComponent', () => {
  let component: QuizIntroComponent;
  let fixture: ComponentFixture<QuizIntroComponent>;
  let elDebug: DebugElement;
  let el: HTMLElement;
  let mockStore: MockStore;
  let mockSelectQuizOptions: MemoizedSelector<QuizState, QuizOptions>;

  beforeEach(fakeAsync( () => {
    TestBed.configureTestingModule({
      declarations: [ QuizIntroComponent ],
      imports: [CommonModule,FormsModule],
providers: [provideMockStore()]
    })
    .compileComponents();

    mockStore = TestBed.inject(MockStore);
    mockSelectQuizOptions = mockStore.overrideSelector(
      selectQuizOptions,
      QuizStateTestFixture.quizOptions
    ); 
    fixture = TestBed.createComponent(QuizIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();

    el = fixture.nativeElement as HTMLElement;
    elDebug = fixture.debugElement;
    fixture.detectChanges();
  }));

  afterEach(() => {
    mockStore.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a Welcome title', () => {
    expect(el.querySelector('h1')?.textContent).toContain('Welcome!');
  });

  it('should have a form', () => {
    expect(el.querySelector('form')).toBeTruthy();
  });

  it('should have a two form-groups', () => {
    expect(el.querySelectorAll('.form-group')?.length).toBe(2);
  });

  it('should have a begin button', () => {
    expect(el.querySelector('button')?.textContent).toContain('Begin');
  });

  it('should have a label for number of questions option', () => {
    expect(el.querySelector('.form-group label')?.textContent).toContain('Number Questions: (1-50)');
  });

  it('should have a input for number of questions with a value of 10', () => {
    const input = el.querySelector('.form-group input') as HTMLInputElement;
    expect(input?.value).toBe('10');
  });

  it('should have a label for Randomize option', () => {
    expect(el.querySelectorAll('.form-group label')[1]?.textContent).toContain('Randomize');
  });

  it('should have a input for Randomize with a property of "checked" to be true', () => {
    const input = el.querySelectorAll('.form-group input')[1] as HTMLInputElement;
    expect(input?.checked).toBeTrue();
  });

  it('should have a input for Randomize with a property of "checked" to be false', () => {
    const input = el.querySelectorAll('.form-group input')[1] as HTMLInputElement;
    mockSelectQuizOptions.setResult({
      numberOfQuestions: 3,
      shouldRandomize: false
    });
    mockStore.refreshState();
    fixture.detectChanges();
    expect(input?.checked).toBeFalse();
  });

  it('should have a input for numberOfQuestions with a value of "10"', () => {
    const input = el.querySelectorAll('.form-group input')[0] as HTMLInputElement;
    expect(input?.value).toEqual('10');
  });

  it('should have a input for numberOfQuestions with a value of "3"', () => {
    const input = el.querySelectorAll('.form-group input')[0] as HTMLInputElement;
    mockSelectQuizOptions.setResult({
      numberOfQuestions: 3,
      shouldRandomize: false
    });
    mockStore.refreshState();
    fixture.detectChanges();
    expect(input?.value).toEqual('3');
  });

  it('should have have an onSubmit method and be called 1 times with the right args', () => {
    const compSpy = spyOn(component, 'onSubmit');
    const button = el.querySelector('button');
    (button as HTMLButtonElement).click();
    expect(compSpy).toHaveBeenCalledWith('10', true);
    expect(compSpy).toHaveBeenCalled();
  });

  it('should have have an onSubmit method and be called 1 times with the right args', () => {
    mockSelectQuizOptions.setResult({
      numberOfQuestions: 3,
      shouldRandomize: false
    });
    mockStore.refreshState();
    fixture.detectChanges();
    const compSpy = spyOn(component, 'onSubmit');
    const button = el.querySelector('button');
    (button as HTMLButtonElement).click();
    expect(compSpy).toHaveBeenCalledWith('3', false);
    expect(compSpy).toHaveBeenCalled();
  });

  it('should call onSubmit and dispatch "[User] Set quiz options"', () => {
    const button = el.querySelector('button');
    (button as HTMLButtonElement).click();
    mockStore.scannedActions$.subscribe(action => {
      expect(action.type).toBe('[User] Set quiz options');
    })
  });
});
