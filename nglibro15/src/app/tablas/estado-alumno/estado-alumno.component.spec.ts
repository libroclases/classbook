import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoAlumnoComponent } from './estado-alumno.component';

describe('EstadoAlumnoComponent', () => {
  let component: EstadoAlumnoComponent;
  let fixture: ComponentFixture<EstadoAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoAlumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
