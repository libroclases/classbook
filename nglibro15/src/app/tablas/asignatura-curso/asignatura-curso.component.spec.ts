import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturaCursoComponent } from './asignatura-curso.component';

describe('AsignaturaCursoComponent', () => {
  let component: AsignaturaCursoComponent;
  let fixture: ComponentFixture<AsignaturaCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignaturaCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignaturaCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
