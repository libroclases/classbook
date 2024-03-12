import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraComponent } from './cabecera.component';
import {  AuthModule, AuthService } from '@auth0/auth0-angular';
import { UserInfoService } from 'src/app/shared/services/user-info/user-info.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';



describe('CabeceraComponent', () => {
  let component: CabeceraComponent;
  let fixture: ComponentFixture<CabeceraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule,
        AuthModule.forRoot({
          domain: 'dev-tupdibnrpuxah8p3.us.auth0.com',
          clientId: 'oW9EH9gLFZFovbTIEaafmVNwg55iCGim',
        }),
       ],
      declarations: [ CabeceraComponent ],
      providers: [UserInfoService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabeceraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
