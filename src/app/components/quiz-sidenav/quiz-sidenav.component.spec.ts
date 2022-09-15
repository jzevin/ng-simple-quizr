import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSidenavComponent } from './quiz-sidenav.component';

describe('QuizOverviewComponent', () => {
  let component: QuizSidenavComponent;
  let fixture: ComponentFixture<QuizSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizSidenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
