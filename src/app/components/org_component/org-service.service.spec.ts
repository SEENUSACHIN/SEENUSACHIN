import { TestBed } from '@angular/core/testing';

import { OrgServiceService } from './org-service.service';

describe('OrgServiceService', () => {
  let service: OrgServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
