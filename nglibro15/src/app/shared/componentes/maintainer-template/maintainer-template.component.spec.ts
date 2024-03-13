import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainerTemplateComponent } from './maintainer-template.component';
import { MockComponent } from 'ng-mocks';
import { MaintainerComponent } from '../maintainer/maintainer.component';

describe('MaintainerTemplateComponent', () => {
  let component: MaintainerTemplateComponent;
  let fixture: ComponentFixture<MaintainerTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintainerTemplateComponent],
      declarations: [
        MaintainerTemplateComponent,
        MockComponent(MaintainerComponent), 
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaintainerTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
