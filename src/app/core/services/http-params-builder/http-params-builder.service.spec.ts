import { TestBed } from '@angular/core/testing';

import { HttpParamsBuilderService } from './http-params-builder.service';

describe('HttpParamsBuilderService', () => {
  let service: HttpParamsBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpParamsBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
