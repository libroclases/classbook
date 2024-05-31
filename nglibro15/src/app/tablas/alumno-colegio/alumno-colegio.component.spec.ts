import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoColegioComponent } from './alumno-colegio.component';

describe('AlumnoColegioComponent', () => {
  let component: AlumnoColegioComponent;
  let fixture: ComponentFixture<AlumnoColegioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoColegioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoColegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
