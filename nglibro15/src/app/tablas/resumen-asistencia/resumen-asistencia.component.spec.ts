import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiSelectComponent } from 'src/app/shared/componentes/multi-select/multi-select.component';
import { ResumenAsistenciaComponent } from './resumen-asistencia.component';
import { of } from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MockComponent, MockedComponentFixture, MockRender } from 'ng-mocks';

const crudServiceMock = {
  getData: () => of([])
}

describe('ResumenAsistenciaComponent', () => {
  let component: ResumenAsistenciaComponent;
  let fixture: ComponentFixture<ResumenAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      providers:[
        { 
          provide: CrudService, useValue: crudServiceMock 
        }
      ], 
      declarations: [ 
        ResumenAsistenciaComponent,
        MockComponent(MultiSelectComponent),      
       ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
