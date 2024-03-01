import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenAsistenciaComponent } from './resumen-asistencia.component';

describe('ResumenAsistenciaComponent', () => {
  let component: ResumenAsistenciaComponent;
  let fixture: ComponentFixture<ResumenAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenAsistenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
