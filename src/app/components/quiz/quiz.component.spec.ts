import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizComponent } from './quiz.component';
import { QuizContentComponent } from '../quiz-content/quiz-content.component';
import { QuizInfoComponent } from '../quiz-info/quiz-info.component';
import { QuizNavComponent } from '../quiz-nav/quiz-nav.component';
import { QuizSidenavComponent } from '../quiz-sidenav/quiz-sidenav.component';
import { StoreModule } from '@ngrx/store';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [
        QuizComponent,
        QuizNavComponent,
        QuizSidenavComponent,
        QuizContentComponent,
        QuizInfoComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
