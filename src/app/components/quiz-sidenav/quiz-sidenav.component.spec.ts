import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSidenavComponent } from './quiz-sidenav.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('QuizSidenavComponent', () => {
  let component: QuizSidenavComponent;
  let fixture: ComponentFixture<QuizSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizSidenavComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
