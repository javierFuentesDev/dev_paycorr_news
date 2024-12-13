import {inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {NotificationService} from "../services/notification-service/notification-service.service";

@Injectable()
export class NytimesApiInterceptor implements HttpInterceptor {
  notificationService = inject(NotificationService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isNyTimesRequest = req.url.includes(environment.NY_TIMES_DOMAIN);
    const clonedRequest = isNyTimesRequest
      ? req.clone({setParams: {'api-key': environment.NY_TIMES_API_KEY}})
      : req;

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessages: { [status: number]: string } = {
          0: 'No internet connection or API server is unreachable',
          400: 'Bad Request',
          401: 'Unauthorized',
          403: 'Forbidden',
          404: 'Not Found',
          500: 'Internal Server Error'
        };

        const errorMessage =
          error.error instanceof ErrorEvent
            ? `Client Error: ${error.error.message}`
            : errorMessages[error.status] || `Error: ${error.statusText || 'Unknown error'}`;

        this.notificationService.error(errorMessage, 'Error');
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
