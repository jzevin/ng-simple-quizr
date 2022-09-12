import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizInfoComponent } from '../quiz-info/quiz-info.component';
import { QuizNavComponent } from './quiz-nav.component';

describe('QuizNavComponent', () => {
  let component: QuizNavComponent;
  let fixture: ComponentFixture<QuizNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizNavComponent, QuizInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
