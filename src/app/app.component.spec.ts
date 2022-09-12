import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizContentComponent } from './components/quiz-content/quiz-content.component';
import { QuizInfoComponent } from './components/quiz-info/quiz-info.component';
import { QuizNavComponent } from './components/quiz-nav/quiz-nav.component';
import { QuizOverviewComponent } from './components/quiz-overview/quiz-overview.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      declarations: [
        AppComponent,
        QuizComponent,
        AppHeaderComponent,
        QuizOverviewComponent,
        QuizNavComponent,
        QuizContentComponent,
        QuizInfoComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
