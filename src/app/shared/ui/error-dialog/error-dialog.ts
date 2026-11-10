import { Component, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { inject } from '@angular/core';

export type ErrorDialogVariant = 'default' | 'jwt-expired' | 'validation-error' | 'not-found';
@Component({
  selector: 'app-error-dialog',
  imports: [MatDialogModule],
  templateUrl: './error-dialog.html',
})
export class ErrorDialog {

  readonly data = inject(MAT_DIALOG_DATA);
  @Input() variant: ErrorDialogVariant = 'default';


}
