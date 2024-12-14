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
export class ApiNytimesInterceptor implements HttpInterceptor {
  notificationService = inject(NotificationService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isNyTimesRequest = req.url.includes(environment.NY_TIMES_DOMAIN);
    const clonedRequest = isNyTimesRequest
      ? req.clone({setParams: {'api-key': environment.NY_TIMES_API_KEY}})
      : req;

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        const errorMessage = this.getErrorMessage(error);
        this.notificationService.error(errorMessage, 'Error');
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    const errorMessages: { [status: number]: string } = {
      0: 'No internet connection or API server is unreachable',
      400: 'Bad Request: Please check your input.',
      401: 'Unauthorized: Invalid API key.',
      403: 'Forbidden: You do not have access to this resource.',
      404: 'Not Found: The requested resource was not found.',
      500: 'Internal Server Error: Please try again later.'
    };

    if (error.error instanceof ErrorEvent) {
      return `Client Error: ${error.error.message}`;
    }

    return errorMessages[error.status] || `${error.statusText || 'Unknown error'}`;
  }

}
