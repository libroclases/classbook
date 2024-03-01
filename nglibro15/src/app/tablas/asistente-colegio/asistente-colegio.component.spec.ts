import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenteColegioComponent } from './asistente-colegio.component';

describe('AsistenteColegioComponent', () => {
  let component: AsistenteColegioComponent;
  let fixture: ComponentFixture<AsistenteColegioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenteColegioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenteColegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
