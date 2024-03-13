import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { RegistroActividadComponent } from './registro-actividad.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';
import { AuthModule } from '@auth0/auth0-angular';
import { MockProviders, MockService } from 'ng-mocks';
import { MatDialog } from '@angular/material/dialog';

describe('RegistroActividadComponent', () => {
  let component: RegistroActividadComponent;
  let fixture: ComponentFixture<RegistroActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        HttpClient,
        MockProviders(CrudService),
        MockProviders(MatDialog)
      ],
      declarations: [ RegistroActividadComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
