import { TestBed } from '@angular/core/testing';

import { ApiServiceNyService } from './api-service-ny.service';

describe('ApiServiceNyService', () => {
  let service: ApiServiceNyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceNyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
