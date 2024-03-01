import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasIncritasComponent } from './horas-incritas.component';

describe('HorasIncritasComponent', () => {
  let component: HorasIncritasComponent;
  let fixture: ComponentFixture<HorasIncritasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorasIncritasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorasIncritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
