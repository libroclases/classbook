import { TestBed } from '@angular/core/testing';

import { CheckboxCalendarComponent } from './checkbox-calendar.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MockComponent, MockRender, MockedComponentFixture } from 'ng-mocks';

describe('CheckboxCalendarComponent', () => {
  let component: CheckboxCalendarComponent;
  let fixture: MockedComponentFixture<CheckboxCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxCalendarComponent],
      declarations: [ MockComponent(CheckboxCalendarComponent) ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = MockRender(CheckboxCalendarComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
