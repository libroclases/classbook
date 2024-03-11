import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfesorComponent } from './profesor.component';
import { main } from '@popperjs/core';
import { MaintainerComponent } from 'src/app/shared/componentes/maintainer/maintainer.component';
import { CrudService } from 'src/app/shared/services/crud/crud.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProfesorComponent', () => {
  let component: ProfesorComponent;
  let fixture: ComponentFixture<ProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesorComponent, MaintainerComponent, HttpClientModule ],
      providers: [CrudService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
