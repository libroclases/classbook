import { TestBed } from '@angular/core/testing';
import { MockComponent, MockRender, MockedComponentFixture } from 'ng-mocks';
import { ModalDialogComponent } from './modal-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ModalDialogComponent', () => {
  let component: ModalDialogComponent;
  let fixture: MockedComponentFixture<ModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDialogComponent],
      declarations: [ MockComponent(ModalDialogComponent) ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = MockRender(ModalDialogComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
