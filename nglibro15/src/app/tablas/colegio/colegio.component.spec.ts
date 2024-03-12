import { TestBed } from '@angular/core/testing';

import { ColegioComponent } from './colegio.component';
import { MaintainerComponent } from 'src/app/shared/componentes/maintainer/maintainer.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MockComponent, MockedComponentFixture, MockRender } from 'ng-mocks';

describe('ColegioComponent', () => {
  let component: ColegioComponent;
  let fixture: MockedComponentFixture<ColegioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ColegioComponent,
        MockComponent(MaintainerComponent),       
      ],
      providers:[ ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = MockRender(ColegioComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
