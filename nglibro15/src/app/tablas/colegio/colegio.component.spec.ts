import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ColegioComponent } from './colegio.component';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { HttpClientModule } from '@angular/common/http';
import { MaintainerComponent } from 'src/app/shared/componentes/maintainer/maintainer.component';
import { AuthService } from '@auth0/auth0-angular';

describe('ColegioComponent', () => {
  let component: ColegioComponent;
  let fixture: ComponentFixture<ColegioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],    
      declarations: [ ColegioComponent, MaintainerComponent ],
      providers:[CrudService, AuthService],
      schemas:[[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
