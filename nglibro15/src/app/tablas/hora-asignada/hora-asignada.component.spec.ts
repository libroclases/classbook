import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraAsignadaComponent } from './hora-asignada.component';

describe('HoraAsignadaComponent', () => {
  let component: HoraAsignadaComponent;
  let fixture: ComponentFixture<HoraAsignadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoraAsignadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoraAsignadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
