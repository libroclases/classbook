import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraAsignadaComponent } from './hora-asignada.component';
import { MaintainerComponent } from 'src/app/shared/componentes/maintainer/maintainer.component';
import { HttpClientModule } from '@angular/common/http';
import { CrudService } from 'src/app/shared/services/crud/crud.service';

describe('HoraAsignadaComponent', () => {
  let component: HoraAsignadaComponent;
  let fixture: ComponentFixture<HoraAsignadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoraAsignadaComponent, MaintainerComponent, HttpClientModule ],
      providers: [CrudService]
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
