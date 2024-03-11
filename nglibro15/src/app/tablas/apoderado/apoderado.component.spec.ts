import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApoderadoComponent } from './apoderado.component';
import { MaintainerComponent } from 'src/app/shared/componentes/maintainer/maintainer.component';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ApoderadoComponent', () => {
  let component: ApoderadoComponent;
  let fixture: ComponentFixture<ApoderadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApoderadoComponent, MaintainerComponent ],
      providers:[CrudService, HttpClient],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApoderadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
