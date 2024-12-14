import {inject, Injectable} from '@angular/core';
import {
  NotiflixNotificationAdapter
} from "../adapters/notiflix-notification-adapter/notiflix-notification-adapter.service";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notificationAdapter = inject(NotiflixNotificationAdapter);

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
