import {Injectable} from '@angular/core';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  formatDate(date: string | Date): string {
    return date ? formatDate(date, 'yyyyMMdd', 'en') : '';
  }
}
