import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculaComponent } from './matricula.component';
import { MaintainerComponent } from 'src/app/shared/componentes/maintainer/maintainer.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
// import { AuthModule } from '@auth0/auth0-angular';
import { MockComponent, MockedComponentFixture, MockRender } from 'ng-mocks';


describe('MatriculaComponent', () => {
  let component: MatriculaComponent;
  let fixture: MockedComponentFixture<MatriculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
     /* imports: [
        AuthModule.forRoot({
          domain: 'dev-tupdibnrpuxah8p3.us.auth0.com',
          clientId: 'oW9EH9gLFZFovbTIEaafmVNwg55iCGim',
        })
      ],
      */
      declarations: [ 
        MatriculaComponent,
        MockComponent(MaintainerComponent),       
      ],
      providers:[ ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = MockRender(MatriculaComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
