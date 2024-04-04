import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenNotaComponent } from './resumen-nota.component';

describe('ResumenNotaComponent', () => {
  let component: ResumenNotaComponent;
  let fixture: ComponentFixture<ResumenNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenNotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
