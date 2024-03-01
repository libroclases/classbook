import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculaAlumnoComponent } from './matricula-alumno.component';

describe('MatriculaAlumnoComponent', () => {
  let component: MatriculaAlumnoComponent;
  let fixture: ComponentFixture<MatriculaAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatriculaAlumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatriculaAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
