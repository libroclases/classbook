import { TestBed } from '@angular/core/testing';
import { MockedComponentFixture, MockRender, MockComponent } from 'ng-mocks';
import { MultiSelectComponent } from './multi-select.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('MultiSelectComponent', () => {
  let component: MultiSelectComponent;
  let fixture: MockedComponentFixture<MultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MockComponent(MultiSelectComponent) ],
      
      imports: [],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = MockRender(MultiSelectComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
