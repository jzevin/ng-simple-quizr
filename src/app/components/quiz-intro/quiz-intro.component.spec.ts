import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuizIntroComponent } from './quiz-intro.component';
import { initialQuizState } from '../../state/quiz.state.reducers';
import { provideMockStore } from '@ngrx/store/testing';

describe('QuizIntroComponent', () => {
  let component: QuizIntroComponent;
  let fixture: ComponentFixture<QuizIntroComponent>;
  let elDebug: DebugElement;
  let el: HTMLElement;

  beforeEach(fakeAsync( () => {
    TestBed.configureTestingModule({
      declarations: [ QuizIntroComponent ],
      imports: [CommonModule,FormsModule],
providers: [
        provideMockStore({
          initialState: {
            quiz: {...initialQuizState},
          }
        }),
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(QuizIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();

    el = fixture.nativeElement as HTMLElement;
    elDebug = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should create', () => {
    console.log('component',component);
    
    expect(component).toBeTruthy();
  });
});
