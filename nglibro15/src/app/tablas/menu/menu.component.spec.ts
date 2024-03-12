import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserInfoService } from 'src/app/shared/services/user-info/user-info.service';
import { HttpClientModule } from '@angular/common/http';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { AuthModule } from '@auth0/auth0-angular';

const crudServiceMock = {
  putData: () => null
}

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AuthModule.forRoot({
          domain: 'dev-tupdibnrpuxah8p3.us.auth0.com',
          clientId: 'oW9EH9gLFZFovbTIEaafmVNwg55iCGim',
        }),
      
      ],
      declarations: [ MenuComponent ],
      providers: [UserInfoService, 
      
        {
          provide: CrudService,
          useValue: crudServiceMock 
        }      
      
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
