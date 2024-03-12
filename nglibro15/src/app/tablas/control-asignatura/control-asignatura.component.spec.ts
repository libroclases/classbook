import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ControlAsignaturaComponent } from './control-asignatura.component';
import { of } from 'rxjs';

const crudServiceMock = {
  getData: () => of([])
}

describe('ControlAsignaturaComponent', () => {
  let component: ControlAsignaturaComponent;
  let fixture: ComponentFixture<ControlAsignaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:[
        { 
          provide: CrudService, useValue: crudServiceMock 
        }
      ], 
      declarations: [ ControlAsignaturaComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlAsignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
