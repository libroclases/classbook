import { TestBed } from '@angular/core/testing';

import { OriginTableIdService } from './origin-table-id.service';

describe('OriginTableIdService', () => {
  let service: OriginTableIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OriginTableIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
