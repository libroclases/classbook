import { TestBed } from '@angular/core/testing';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AnotacionesComponent } from './anotaciones.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../../shared/componentes/modal-dialog/modal-dialog.component';
import { MockComponent, MockedComponentFixture, MockService, MockRender, MockModule } from 'ng-mocks';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { UserInfoService } from 'src/app/shared/services/user-info/user-info.service';

// UserInfoService

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
        },

        
        
      ], 
      declarations: [ 
        AnotacionesComponent,
        MockComponent(ModalDialogComponent),
        // MockService(UserInfoService) 
        
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = MockRender(AnotacionesComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
