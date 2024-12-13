import { TestBed } from '@angular/core/testing';

import { NytimesApiInterceptor } from './nytimes-api.interceptor';

describe('NytimesApiInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NytimesApiInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: NytimesApiInterceptor = TestBed.inject(NytimesApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
