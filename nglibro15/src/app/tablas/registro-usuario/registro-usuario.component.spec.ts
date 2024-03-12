import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroUsuarioComponent } from './registro-usuario.component';
import { MockComponent,MockService ,MockedComponentFixture, MockRender } from 'ng-mocks';
import { MatDialog } from '@angular/material/dialog';
import { Spy } from 'jasmine-auto-spies';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('RegistroUsuarioComponent', () => {
  let component: RegistroUsuarioComponent;
  let fixture: MockedComponentFixture<RegistroUsuarioComponent>;

  let dialog: Spy<MatDialog>;
  

  const crudServiceMock = {
    getData: () => of([])
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useValue: dialog },
        { provide: CrudService, useValue: crudServiceMock }
      ],
      declarations: [ RegistroUsuarioComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = MockRender(RegistroUsuarioComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
