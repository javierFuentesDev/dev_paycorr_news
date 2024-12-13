import {inject, Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NotificationAdapter} from "../notification-adapter/notification-adapter";

@Injectable({
  providedIn: 'root',
})
export class ToastrNotificationAdapter implements NotificationAdapter {

  toastr = inject(ToastrService);

  success(message: string, title?: string): void {
    this.toastr.success(message, title || 'Success');
  }

  error(message: string, title?: string): void {
    this.toastr.error(message, title || 'Error');
  }

  warning(message: string, title?: string): void {
    this.toastr.warning(message, title || 'Warning');
  }

  info(message: string, title?: string): void {
    this.toastr.info(message, title || 'Info');
  }
}
