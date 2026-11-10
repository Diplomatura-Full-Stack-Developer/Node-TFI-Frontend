import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { withInterceptors } from '@angular/common/http';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { ErrorHandler } from '@angular/core';
import { ErrorHandlerService } from './core/services/error-handler.service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorHandlerInterceptor])),
    { provide: ErrorHandler, useClass: ErrorHandlerService },
  ],
};
