import { TestBed } from '@angular/core/testing';

import { ForeignKeysService } from './foreign-keys.service';

describe('ForeignKeysService', () => {
  let service: ForeignKeysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForeignKeysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
