import { TestBed } from '@angular/core/testing';

import { AsignaturaProfesorComponent } from './asignatura-profesor.component';
import { MaintainerComponent } from 'src/app/shared/componentes/maintainer/maintainer.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MockComponent, MockedComponentFixture, MockRender } from 'ng-mocks';

describe('AsignaturaProfesorComponent', () => {
  let component: AsignaturaProfesorComponent;
  let fixture: MockedComponentFixture<AsignaturaProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        AsignaturaProfesorComponent,
        MockComponent(MaintainerComponent),       
      ],
      providers:[ ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = MockRender(AsignaturaProfesorComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
