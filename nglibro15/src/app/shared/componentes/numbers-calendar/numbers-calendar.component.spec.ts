import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbersCalendarComponent } from './numbers-calendar.component';

describe('NumbersCalendarComponent', () => {
  let component: NumbersCalendarComponent;
  let fixture: ComponentFixture<NumbersCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumbersCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumbersCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
