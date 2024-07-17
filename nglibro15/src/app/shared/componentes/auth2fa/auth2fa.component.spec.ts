import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth2fa.Component } from './auth2fa.component';

describe('Auth2Component', () => {
  let component: Auth2faComponent;
  let fixture: ComponentFixture<Auth2faComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Auth2faComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Auth2faComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
