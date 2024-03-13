import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent, MockRender, MockedComponentFixture } from 'ng-mocks';
import { MaintainerComponent } from './maintainer.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('MaintainerComponent', () => {
  let component: MaintainerComponent;
  let fixture: MockedComponentFixture<MaintainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintainerComponent],
      declarations: [ MockComponent(MaintainerComponent)  ], 
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = MockRender(MaintainerComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
