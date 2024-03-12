import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AnotacionesComponent } from './anotaciones.component';
import {  MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../../shared/componentes/modal-dialog/modal-dialog.component';
import { MockComponent, MockedComponentFixture, MockModule, MockRender } from 'ng-mocks';
import { of } from 'rxjs';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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

describe('AnotacionesComponent', () => {
  let component: AnotacionesComponent;
  let fixture: MockedComponentFixture<AnotacionesComponent>;

  beforeEach(async () => {
   
    await TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
      ]
        ,
      providers:[
        { 
          provide: CrudService, 
          useValue: crudServiceMock 
        },
        {
          provide: MatDialog, 
          useValue: MatDialogMock
        }
       
      ], 
      declarations: [ 
        AnotacionesComponent,
        MockComponent(ModalDialogComponent),  
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = MockRender(AnotacionesComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
