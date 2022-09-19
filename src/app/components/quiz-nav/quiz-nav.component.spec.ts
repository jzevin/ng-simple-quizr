import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { QuizInfoComponent } from '../quiz-info/quiz-info.component';
import { QuizNavComponent } from './quiz-nav.component';
import { initialQuizState } from 'src/app/state/quiz.state.reducers';
import { provideMockStore } from '@ngrx/store/testing';

const questions = [{
  subject: 'math',
  question: 'What is 7 times 6?',
  options: [
    '42',
    '36',
    '49',
    '14'
  ],
  answerIndex: 1,
  id: 'y5lv4glt9gyrpys40y'
},
{
  subject: 'geography',
  question: 'Which river forms the border between India and Bangladesh? ',
  options: [
    'Ganges River',
    'Indus River',
    'Brahmaputra River'
  ],
  answerIndex: 2,
  id: 'iiclv88q8hmt79hu8m'
}]
const answers = {
  y5lv4glt9gyrpys40y: {
    answerIndex: -1
  },
  iiclv88q8hmt79hu8m: {
    answerIndex: -1
  },
}
describe('QuizNavComponent', () => {
  let component: QuizNavComponent;
  let fixture: ComponentFixture<QuizNavComponent>;
  let elDebug: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizNavComponent, QuizInfoComponent],
      providers: [provideMockStore({
        initialState: {
          quiz: {
            ...initialQuizState,
            questions: [...questions],
            answers: answers,
          },
        }
      })],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizNavComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement as HTMLElement;
    elDebug = fixture.debugElement;
    fixture.detectChanges();
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
});
