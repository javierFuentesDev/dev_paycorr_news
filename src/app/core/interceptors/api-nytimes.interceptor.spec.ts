import { TestBed } from '@angular/core/testing';

import { ApiNytimesInterceptor } from './api-nytimes.interceptor';

describe('ApiNytimesInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiNytimesInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApiNytimesInterceptor = TestBed.inject(ApiNytimesInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
