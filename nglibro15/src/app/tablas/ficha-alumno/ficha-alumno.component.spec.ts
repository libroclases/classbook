import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaAlumnoComponent } from './ficha-alumno.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud/crud.service';

const crudServiceMock = {
  getData: () => of([])
}



describe('FichaAlumnoComponent', () => {
  let component: FichaAlumnoComponent;
  let fixture: ComponentFixture<FichaAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaAlumnoComponent ],
      providers: [
        { 
          provide: CrudService, useValue: crudServiceMock 
        },
             
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
