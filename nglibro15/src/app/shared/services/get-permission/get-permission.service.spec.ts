import { TestBed } from '@angular/core/testing';

import { GetPermissionService } from './get-permission.service';

describe('GetPermissionService', () => {
  let service: GetPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
