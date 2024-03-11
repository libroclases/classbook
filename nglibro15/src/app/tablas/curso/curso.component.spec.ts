import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoComponent } from './curso.component';
import { MaintainerComponent } from 'src/app/shared/componentes/maintainer/maintainer.component';
import { HttpClientModule } from '@angular/common/http';
import { CrudService } from 'src/app/shared/services/crud/crud.service';

describe('CursoComponent', () => {
  let component: CursoComponent;
  let fixture: ComponentFixture<CursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoComponent, MaintainerComponent, HttpClientModule ],
      providers: [CrudService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
