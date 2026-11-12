import { Service } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialog } from '../ui/error-dialog/error-dialog';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';
@Service()
export class ErrorDialogService {
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private authService = inject(AuthService);

  openDialog(title: string, message?: string, redirect?: string, buttonText?: string) {

    if (buttonText === "Mantener sesión abierta") {

      this.dialog.open(ErrorDialog, {
        data: {
          title,
          message,
          buttonText
        }
      }).afterClosed().subscribe((result) => {
        if (result === "refresh") {
          this.authService.refreshToken();
          clearTimeout(timeout);
        }
      })
      const timeout = setTimeout(() => {
        this.authService.logoutUser();
        this.router.navigate([`/${redirect}`]);
        this.dialog.closeAll();
      }, 1000 * 10);
    } else {
      this.dialog.open(ErrorDialog, {
        data: {
          title,
          message,
          buttonText
        }
      }).afterClosed().subscribe(() => {
        if (redirect) {
          this.router.navigate([`/${redirect}`]);
        }
      })
    }
  }

}
