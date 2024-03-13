import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaComponent } from './nota.component';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

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

describe('NotaComponent', () => {
  let component: NotaComponent;
  let fixture: ComponentFixture<NotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotaComponent ],
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

    fixture = TestBed.createComponent(NotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
