import { TestBed } from '@angular/core/testing';

import { AdministradorComponent } from './administrador.component';
import { MaintainerComponent } from 'src/app/shared/componentes/maintainer/maintainer.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MockComponent, MockedComponentFixture, MockRender } from 'ng-mocks';

describe('UtpComponent', () => {
  let component: AdministradorComponent;
  let fixture: MockedComponentFixture<AdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AdministradorComponent,
        MockComponent(MaintainerComponent),
      ],
      providers:[ ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = MockRender(AdministradorComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
