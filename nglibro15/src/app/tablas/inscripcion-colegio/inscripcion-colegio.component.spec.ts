import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionColegioComponent } from './inscripcion-colegio.component';

describe('InscripcionColegioComponent', () => {
  let component: InscripcionColegioComponent;
  let fixture: ComponentFixture<InscripcionColegioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscripcionColegioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionColegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
