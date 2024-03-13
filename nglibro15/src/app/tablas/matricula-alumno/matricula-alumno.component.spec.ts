import { TestBed } from '@angular/core/testing';

import { MatriculaAlumnoComponent } from './matricula-alumno.component';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MockComponent, MockRender, MockedComponentFixture } from 'ng-mocks';


describe('MatriculaAlumnoComponent', () => {
  let component: MatriculaAlumnoComponent;
  let fixture: MockedComponentFixture<MatriculaAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MockComponent(MatriculaAlumnoComponent) ],
      imports: [
        HttpClientModule,
      ], 
      providers:[],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = MockRender(MatriculaAlumnoComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
