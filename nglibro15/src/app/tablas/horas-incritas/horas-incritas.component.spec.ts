import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasInscritasComponent } from './horas-incritas.component';

describe('HorasIncritasComponent', () => {
  let component: HorasInscritasComponent;
  let fixture: ComponentFixture<HorasInscritasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorasInscritasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorasInscritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
