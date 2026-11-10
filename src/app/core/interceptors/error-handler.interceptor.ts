import type { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../services/error-handler.service';
import { inject } from '@angular/core';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {

  const errorHandlerService = inject(ErrorHandlerService);

  return next(req).pipe(
    catchError((response: HttpErrorResponse) => {
      const data = response.error;

      switch (data.code) {
        case "VALIDATION_ERROR":
          // data.errors → junto a cada campo
          console.log(data.code);
          console.log(data.errors);
          break;
        case "DUPLICATE_KEY":
          // toast con data.message
          console.log(data.code);
          console.log(data.message);
          break;
        case "APP_ERROR":
          // toast con data.message
          break;
        default:
          if (response.status === 401) {
            // ir a login
          }
          break;
      }      return throwError(() => response);
    })
  );
};
