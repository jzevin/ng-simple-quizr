import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { QuizContentComponent } from './quiz-content.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('QuizContentComponent', () => {
  let component: QuizContentComponent;
  let fixture: ComponentFixture<QuizContentComponent>;
  let elDebug: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizContentComponent],
      providers: [
        provideMockStore({
          initialState: {
            quiz: {
              questions: [
                {
                  subject: 'history',
                  question:
                    'Which ocean lies on the western coast of South America?',
                  options: [
                    'Pacific Ocean',
                    'Atlantic Ocean',
                    'Indian Ocean',
                    'Southern Ocean',
                  ],
                  id: 'r2m0epr4lku8zjv2kx',
                },
              ],
              currentQuestionIndex: 0,
              answers: {
                r2m0epr4lku8zjv2kx: {
                  answerIndex: -1,
                },
              },
              errors: [],
              loading: false,
              theme: 'light',
              zoom: 1,
            },
          },
        }),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(QuizContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
    elDebug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a quizState$ property', () => {
    expect(component.currentQuestion$).toBeTruthy();
  });

  it('should have an element with a "question" class', () => {
    expect(el.querySelector('.question')).toBeTruthy();
  });

  it('should have at least one element with an "option" class', () => {
    expect(
      fixture.nativeElement.querySelectorAll('.option').length
    ).toBeGreaterThan(0);
  });
});
