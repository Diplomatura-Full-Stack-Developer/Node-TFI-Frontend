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
          errorHandlerService.handlerZodError(data);
          break;
        case "DUPLICATE_KEY":
          errorHandlerService.handlerDuplicatedKey(data);
          break;
        case "AUTHORIZATION_HEADER_MISSING":
          errorHandlerService.handlerAuthError(data);

          break;
        case "TOKEN_INVALID":
          if (req.url.includes("/auth/refresh-token")) {
            break;
          }
          errorHandlerService.handlerInvalidToken(data)
          break;
        case "INVALID_CREDENTIALS":
          errorHandlerService.handlerInvalidCredentials(data);
          break;
        default:
          errorHandlerService.handlerDefaultError(data);

      }
      return throwError(() => response);
    })
  );
};
