import { Injectable } from '@angular/core';
import * as Notiflix from 'notiflix';

@Injectable({
  providedIn: 'root',
})
export class NotiflixNotificationAdapter {

  success(message: string, title?: string): void {
    Notiflix.Notify.success(`${title ? `${title}: ` : ''}${message}`);
  }

  error(message: string, title?: string): void {
    Notiflix.Notify.failure(`${title ? `${title}: ` : ''}${message}`);
  }

  warning(message: string, title?: string): void {
    Notiflix.Notify.warning(`${title ? `${title}: ` : ''}${message}`);
  }

  info(message: string, title?: string): void {
    Notiflix.Notify.info(`${title ? `${title}: ` : ''}${message}`);
  }
}
