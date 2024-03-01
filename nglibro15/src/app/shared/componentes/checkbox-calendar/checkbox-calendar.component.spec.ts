import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxCalendarComponent } from './checkbox-calendar.component';

describe('CheckboxCalendarComponent', () => {
  let component: CheckboxCalendarComponent;
  let fixture: ComponentFixture<CheckboxCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckboxCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
