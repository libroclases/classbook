import { TestBed } from '@angular/core/testing';

import { SelectionIdsService } from './selection-ids.service';

describe('SelectionIdsService', () => {
  let service: SelectionIdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectionIdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
