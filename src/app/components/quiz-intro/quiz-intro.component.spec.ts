import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuizIntroComponent } from './quiz-intro.component';
import { initialQuizState } from '../../state/quiz.state.reducers';
import { provideMockStore } from '@ngrx/store/testing';

fdescribe('QuizIntroComponent', () => {
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
    expect(component).toBeTruthy();
  });

  it('should have a Welcome title', () => {
    expect(el.querySelector('h1')?.textContent).toContain('Welcome!');
  });

  it('should have a form', () => {
    expect(el.querySelector('form')).toBeTruthy();
  });

  it('should have a two form-groups', () => {
    expect(el.querySelectorAll('.form-group')?.length).toBe(2);
  });

  it('should have a begin button', () => {
    expect(el.querySelector('button')?.textContent).toContain('Begin');
  });

  it('should have a label for number of questions option', () => {
    expect(el.querySelector('.form-group label')?.textContent).toContain('Number Questions: (1-50)');
  });

  it('should have a input for number of questions with a value of 10', () => {
    const input = el.querySelector('.form-group input') as HTMLInputElement;
    expect(input?.value).toBe('10');
  });

  it('should have a label for Randomize option', () => {
    expect(el.querySelectorAll('.form-group label')[1]?.textContent).toContain('Randomize');
  });

  it('should have a input for Randomize with a value of "on"', () => {
    const input = el.querySelectorAll('.form-group input')[1] as HTMLInputElement;
    expect(input?.value).toBe('on');
  });
});
