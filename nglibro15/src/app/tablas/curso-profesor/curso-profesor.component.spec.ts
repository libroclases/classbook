import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoProfesorComponent } from './curso-profesor.component';

describe('CursoProfesorComponent', () => {
  let component: CursoProfesorComponent;
  let fixture: ComponentFixture<CursoProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoProfesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
