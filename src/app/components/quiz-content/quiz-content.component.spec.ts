import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizContentComponent } from './quiz-content.component';
import { StoreModule } from '@ngrx/store';

describe('QuizContentComponent', () => {
  let component: QuizContentComponent;
  let fixture: ComponentFixture<QuizContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [ QuizContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
