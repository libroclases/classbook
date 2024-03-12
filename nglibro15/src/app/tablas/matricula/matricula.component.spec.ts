import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculaComponent } from './matricula.component';
import { MaintainerComponent } from 'src/app/shared/componentes/maintainer/maintainer.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { ActivatedRoute } from '@angular/router';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


const MatDialogRefMock = {
  close: () => true
}

xdescribe('MatriculaComponent', () => {
  let component: MatriculaComponent;
  let fixture: ComponentFixture<MatriculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatDialogRef,
        MAT_DIALOG_DATA,
        HttpClientModule,
        AuthModule.forRoot({
          domain: 'dev-tupdibnrpuxah8p3.us.auth0.com',
          clientId: 'oW9EH9gLFZFovbTIEaafmVNwg55iCGim',
        })
      ],
      declarations: [ MatriculaComponent, MaintainerComponent ],
      providers:[ MatDialogRef,
        {
          provide: ActivatedRoute,
          
          useValue: {data: {
            subscribe: (fn: (value: any) => void) => fn({
                params: {},
            }),
        },  }
        
        },
        
        // { provide: MatDialogRef, useValue: MatDialogRefMock },

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatriculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
