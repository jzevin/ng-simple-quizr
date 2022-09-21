import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AppErrorsComponent } from './app-errors.component';
import { DebugElement } from '@angular/core';
import { MemoizedSelector } from '@ngrx/store';
import { QuizState } from 'src/app/models/quiz.models';
import { selectErrors } from '../../state/quiz.state.selectors';

describe('AppErrorsComponent', () => {
  let component: AppErrorsComponent;
  let fixture: ComponentFixture<AppErrorsComponent>;
  let elDebug: DebugElement;
  let el: HTMLElement;
  let mockSelectErrors: MemoizedSelector<QuizState, Error[]>;
  let mockStore: MockStore;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppErrorsComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    mockSelectErrors = mockStore.overrideSelector(
      selectErrors,
      [new Error('test error 1'), new Error('test error 2')]
    );
    fixture = TestBed.createComponent(AppErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
    elDebug = fixture.debugElement;
  });

  afterEach(() => {
    mockStore.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have errors', () => {
    expect(el.querySelector('.errors')).toBeTruthy();
  });

  it('should have 2 errors', () => {
    expect(el.querySelectorAll('.error').length).toBe(2);
  });

  it('should have 2 error messages', () => {
    expect(el.querySelectorAll('.error .message').length).toBe(2);
  });

  it('should have no more than 2 error messages', () => {
    expect(el.querySelectorAll('.error .message').length).toBeLessThan(3);
  });

  it('should have an error message with the text "test error 1"', () => {
    expect(el.querySelectorAll('.error .message')[0]?.textContent).toBe('test error 1');
  });

  it('should have an error message with the text "test error 2"', () => {
    expect(el.querySelectorAll('.error .message')[1]?.textContent).toBe('test error 2');
  });

  it('should call onClickClose method with the error index when .error elements are clicked', () => {
    const compSpy = spyOn(component, 'onClickClose');
    const errorBtnElements = el.querySelectorAll('.error button');
    errorBtnElements.forEach((el, errorIndex) => {
      (el as HTMLLIElement).click();
      expect(compSpy).toHaveBeenCalledWith(errorIndex);
    });
    fixture.detectChanges();
    expect(compSpy).toHaveBeenCalledTimes(2);
  });

  it('should dispatch "[User] Close error" when clicked', () => {
    const errorBtnElements = el.querySelectorAll('.error button');
    const e1 = errorBtnElements[1] as HTMLLIElement;
    e1.click();
    fixture.detectChanges();
    mockStore.scannedActions$.subscribe(action => {
      expect(action.type).toBe('[User] Close error');
    }); // NOTE: No need to unsubscribe since the ref is getting wiped out before each
  });

});
