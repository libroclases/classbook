import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainerTemplateComponent } from './maintainer-template.component';

describe('MaintainerTemplateComponent', () => {
  let component: MaintainerTemplateComponent;
  let fixture: ComponentFixture<MaintainerTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintainerTemplateComponent]
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
