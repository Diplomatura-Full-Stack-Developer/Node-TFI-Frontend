import { ErrorHandler, Service } from '@angular/core';


@Service()
export class ErrorHandlerService extends ErrorHandler {
  handlerError(errorBody: { message?: string; error?: Record<string, string[]> }) {
    console.log(JSON.stringify(errorBody.error, null, 2));
  }
}
