import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturaComponent } from './asignatura.component';
import { MaintainerComponent } from 'src/app/shared/componentes/maintainer/maintainer.component';
import { HttpClientModule } from '@angular/common/http';
import { CrudService } from 'src/app/shared/services/crud/crud.service';

describe('AsignaturaComponent', () => {
  let component: AsignaturaComponent;
  let fixture: ComponentFixture<AsignaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignaturaComponent, MaintainerComponent, HttpClientModule ],
      providers: [CrudService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
