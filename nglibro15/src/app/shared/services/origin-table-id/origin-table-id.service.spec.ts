import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { OriginTableIdService } from './origin-table-id.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('OriginTableIdService', () => {
  let service: OriginTableIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        MockProvider(OriginTableIdService), 
       ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(OriginTableIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
