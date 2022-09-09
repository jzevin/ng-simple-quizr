import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHeaderComponent } from './app-header.component';
import { DebugElement } from '@angular/core';

describe('AppHeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;
  let elDebug: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
    elDebug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title Quizr', ()=>{
    expect(el.querySelector('h1')?.textContent).toContain('Quizr');
  });

  it('should have an element with a class "app-settings"', ()=>{
    expect(el.querySelector('.app-settings')).toBeTruthy();
  });

  it('should have an element with a class "app-settings" and two buttons', ()=>{
    const btns = el.querySelectorAll('.app-settings button');
    expect(btns.length).toEqual(2);
    expect(btns[0].textContent).toContain('Zoom');
    expect(btns[1].textContent).toContain('toggle theme');
  });
});
