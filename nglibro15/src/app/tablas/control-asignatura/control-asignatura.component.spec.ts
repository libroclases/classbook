import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAsignaturaComponent } from './control-asignatura.component';

describe('ControlAsignaturaComponent', () => {
  let component: ControlAsignaturaComponent;
  let fixture: ComponentFixture<ControlAsignaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlAsignaturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlAsignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
