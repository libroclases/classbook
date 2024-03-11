import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoUsuarioComponent } from './tipo-usuario.component';
import { MaintainerComponent } from 'src/app/shared/componentes/maintainer/maintainer.component';
import { HttpClientModule } from '@angular/common/http';
import { CrudService } from 'src/app/shared/services/crud/crud.service';

describe('TipoUsuarioComponent', () => {
  let component: TipoUsuarioComponent;
  let fixture: ComponentFixture<TipoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoUsuarioComponent, MaintainerComponent, HttpClientModule ],
      providers: [CrudService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
