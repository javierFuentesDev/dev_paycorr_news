import { TestBed } from '@angular/core/testing';

import { ToastrNotificationAdapterService } from './toastr-notification-adapter.service';

describe('ToastrNotificationAdapterService', () => {
  let service: ToastrNotificationAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastrNotificationAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});