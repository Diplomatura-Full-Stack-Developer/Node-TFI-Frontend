import { ErrorHandler, Service } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { ErrorDialog } from '../../shared/ui/error-dialog/error-dialog';
@Service()
export class ErrorHandlerService extends ErrorHandler {


  private dialog = inject(MatDialog);
  handlerError(errorBody: { message?: string; error?: Record<string, string[]> }) {
    console.log(JSON.stringify(errorBody.error, null, 2));
    this.dialog.open(ErrorDialog, {
      data: {
        title: 'Producto agregado correctamente',
        message: errorBody.message,
      },
      restoreFocus: false,
    }).afterClosed().subscribe(() => {
    });
  }
}
