import {inject, Injectable} from '@angular/core';
import {ToastrNotificationAdapter} from "../adapters/toastr-notification-adapter/toastr-notification-adapter.service";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notificationAdapter = inject(ToastrNotificationAdapter);

  success(message: string, title?: string): void {
    this.notificationAdapter.success(message, title);
  }

  error(message: string, title?: string): void {
    this.notificationAdapter.error(message, title);
  }

  warning(message: string, title?: string): void {
    this.notificationAdapter.warning(message, title);
  }

  info(message: string, title?: string): void {
    this.notificationAdapter.info(message, title);
  }
}
