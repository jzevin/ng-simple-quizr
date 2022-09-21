import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { QuizState, QuizThemes } from 'src/app/models/quiz.models';

import { AppHeaderComponent } from './app-header.component';
import { DebugElement } from '@angular/core';
import { MemoizedSelector } from '@ngrx/store';
import { selectTheme } from 'src/app/state/quiz.state.selectors';

describe('AppHeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;
  let elDebug: DebugElement;
  let el: HTMLElement;
  let mockStore: MockStore;
  let mockSelectTheme: MemoizedSelector<QuizState, QuizThemes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppHeaderComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    mockSelectTheme = mockStore.overrideSelector(
      selectTheme,
      'dark'
    );
    fixture = TestBed.createComponent(AppHeaderComponent);
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

  it('should have the title Quizr', () => {
    expect(el.querySelector('h1')?.textContent).toContain('Quizr');
  });

  it('should have an element with a class "app-settings"', () => {
    expect(el.querySelector('.app-settings')).toBeTruthy();
  });

  it('should have an element with a class "app-settings" and 3 buttons and have the right text', () => {
    const btns = el.querySelectorAll('.app-settings button');
    expect(btns.length).toEqual(3);
    expect(btns[0].textContent).toContain('Zoom');
    expect(btns[1].textContent).toContain('light theme');
    expect(btns[2].textContent).toContain('Reset');
  });

  it('should have the right button text when the theme is switched', () => {
    const themeBtn = el.querySelector('.theme-btn') as HTMLButtonElement;
    expect(themeBtn.textContent).toContain('light theme');
    mockSelectTheme.setResult('light');
    mockStore.refreshState();
    fixture.detectChanges();
    expect(themeBtn.textContent).toContain('dark theme');
  });

  //theme btn
  it('should call onClickToggleTheme when theme btn is clicked', () => {
    const compSpy = spyOn(component, 'onClickToggleTheme');
    const themeBtn = el.querySelector('.theme-btn') as HTMLButtonElement;
    themeBtn.click();
    fixture.detectChanges();
    expect(compSpy).toHaveBeenCalled();
    expect(compSpy).toHaveBeenCalledWith('dark');
  });

  it('should dispatch "[User] Set theme" when theme btn is clicked', () => {
    const themeBtn = el.querySelector('.theme-btn') as HTMLButtonElement;
    themeBtn.click();
    fixture.detectChanges();
    mockStore.scannedActions$.subscribe(action => {
      expect(action.type).toBe('[User] Set theme');
    })
  });

  // zoom btn
  it('should call onClickZoom when zoom btn is clicked', () => {
    const compSpy = spyOn(component, 'onClickZoom');
    const themeBtn = el.querySelector('.zoom-btn') as HTMLButtonElement;
    themeBtn.click();
    fixture.detectChanges();
    expect(compSpy).toHaveBeenCalled();
  });

  it('should dispatch "[User] Set zoom" when theme btn is clicked', () => {
    const themeBtn = el.querySelector('.zoom-btn') as HTMLButtonElement;
    themeBtn.click();
    fixture.detectChanges();
    mockStore.scannedActions$.subscribe(action => {
      expect(action.type).toBe('[User] Set zoom');
    })
  });

  // reset btn
  it('should call onClickReset when zoom btn is clicked', () => {
    const compSpy = spyOn(component, 'onClickReset');
    const themeBtn = el.querySelector('.reset-btn') as HTMLButtonElement;
    themeBtn.click();
    fixture.detectChanges();
    expect(compSpy).toHaveBeenCalled();
  });

  it('should dispatch "[User] Reset quiz" when theme btn is clicked', () => {
    const themeBtn = el.querySelector('.reset-btn') as HTMLButtonElement;
    themeBtn.click();
    fixture.detectChanges();
    mockStore.scannedActions$.subscribe(action => {
      expect(action.type).toBe('[User] Reset quiz');
    })
  });
});
