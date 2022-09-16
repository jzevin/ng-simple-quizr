import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppErrorsComponent } from './app-errors.component';
import { DebugElement } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

describe('AppErrorsComponent', () => {
  let component: AppErrorsComponent;
  let fixture: ComponentFixture<AppErrorsComponent>;
  let elDebug: DebugElement;
  let el: HTMLElement;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppErrorsComponent],
      providers: [provideMockStore(
        {
          initialState: {
            quiz: {
              errors: [new Error('test error 1'), new Error('test error 2')]
            }
          }
        }
      )],
    }).compileComponents();

    fixture = TestBed.createComponent(AppErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
    elDebug = fixture.debugElement;
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

});
