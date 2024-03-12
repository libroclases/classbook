import { TestBed } from '@angular/core/testing';

import { EstadoAlumnoComponent } from './estado-alumno.component';
import { MaintainerComponent } from 'src/app/shared/componentes/maintainer/maintainer.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MockComponent, MockedComponentFixture, MockRender } from 'ng-mocks';

describe('EstadoAlumnoComponent', () => {
  let component: EstadoAlumnoComponent;
  let fixture: MockedComponentFixture<EstadoAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        EstadoAlumnoComponent,
        MockComponent(MaintainerComponent),       
      ],
      providers:[ ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = MockRender(EstadoAlumnoComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
