import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { inject } from '@angular/core';

export interface ErrorDialogData {
  title: string;
  message?: string;
  buttonText?: string;
}
@Component({
  selector: 'app-error-dialog',
  imports: [MatDialogModule],
  templateUrl: './error-dialog.html',
})
export class ErrorDialog {
  readonly data = inject<ErrorDialogData>(MAT_DIALOG_DATA);


}
