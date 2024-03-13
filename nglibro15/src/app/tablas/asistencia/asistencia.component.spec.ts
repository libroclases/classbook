import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { AsistenciaComponent } from './asistencia.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MockComponent } from 'ng-mocks';
import { MultiSelectComponent } from 'src/app/shared/componentes/multi-select/multi-select.component';

const  crudServiceMock = {
  createDataCustom: () => {}
}

describe('AsistenciaComponent', () => {
  let component: AsistenciaComponent;
  let fixture: ComponentFixture<AsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: CrudService,
          useValue: crudServiceMock
        }
      ],
      declarations: [ AsistenciaComponent,
        MockComponent(MultiSelectComponent),   ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
