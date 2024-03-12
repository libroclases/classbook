import { TestBed } from '@angular/core/testing';

import { HorasInscritasComponent } from './horas-incritas.component';
import { MaintainerComponent } from 'src/app/shared/componentes/maintainer/maintainer.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MockComponent, MockedComponentFixture, MockRender } from 'ng-mocks';

describe('HorasInscritasComponent', () => {
  let component: HorasInscritasComponent;
  let fixture: MockedComponentFixture<HorasInscritasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        HorasInscritasComponent,
        MockComponent(MaintainerComponent),       
      ],
      providers:[ ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = MockRender(HorasInscritasComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
