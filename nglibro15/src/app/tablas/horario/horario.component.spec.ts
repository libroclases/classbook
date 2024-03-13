import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HorarioComponent } from './horario.component';
import { of } from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

const crudServiceMock = {
  getData: () => of([])
}

const MatDialogMock = {
  open() {
    return {
      afterClose: () => of({})
    }
  }
}

describe('HorarioComponent', () => {
  let component: HorarioComponent;
  let fixture: ComponentFixture<HorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioComponent ],
      providers: [
     
        HttpClient,
        { 
          provide: CrudService, 
          useValue: crudServiceMock 
        },
        {
          provide: MatDialog, 
          useValue: MatDialogMock
        }
      
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
