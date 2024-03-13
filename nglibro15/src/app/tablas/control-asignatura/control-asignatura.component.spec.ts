import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ControlAsignaturaComponent } from './control-asignatura.component';
import { MockComponent, MockRender, MockedComponentFixture } from 'ng-mocks';

describe('ControlAsignaturaComponent', () => {
  
  let component: ControlAsignaturaComponent;
  let fixture: MockedComponentFixture<ControlAsignaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlAsignaturaComponent],
      declarations: [ MockComponent(ControlAsignaturaComponent)  ],      
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = MockRender(ControlAsignaturaComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
