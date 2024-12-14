import {Injectable} from '@angular/core';
import * as Notiflix from 'notiflix';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  show(message: string = 'Loading...'): void {
    Notiflix.Loading.circle(message);
  }

  hide(): void {
    Notiflix.Loading.remove();
  }
}
