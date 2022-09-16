import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizInfoComponent } from './quiz-info.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('QuizInfoComponent', () => {
  let component: QuizInfoComponent;
  let fixture: ComponentFixture<QuizInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizInfoComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
