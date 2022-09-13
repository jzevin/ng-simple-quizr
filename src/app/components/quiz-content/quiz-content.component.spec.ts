import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizContentComponent } from './quiz-content.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('QuizContentComponent', () => {
  let component: QuizContentComponent;
  let fixture: ComponentFixture<QuizContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizContentComponent],
      providers: [
        provideMockStore({
          initialState: {
            quiz: {
              currentQuestion: undefined,
              questions: [],
              loading: false,
              error: null,
            },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a quizState$ property', () => {
    expect(component.currentQuestion$).toBeTruthy();
  });

  it('should have an element with a "question" class', () => {
    expect(fixture.nativeElement.querySelector('.question')).toBeTruthy();
  });

  it('should have at least one element with an "answer" class', () => {
    expect(
      fixture.nativeElement.querySelectorAll('.answer').length
    ).toBeGreaterThan(0);
  });
});
