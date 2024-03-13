import { TestBed } from '@angular/core/testing';
import { NumbersCalendarComponent } from './numbers-calendar.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MockComponent, MockRender, MockedComponentFixture } from 'ng-mocks';

describe('NumbersCalendarComponent', () => {
  let component: NumbersCalendarComponent;
  let fixture: MockedComponentFixture<NumbersCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumbersCalendarComponent],
      declarations: [ MockComponent(NumbersCalendarComponent) ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = MockRender(NumbersCalendarComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
