import { ErrorHandler, Service } from '@angular/core';
import { inject } from '@angular/core';
import { ErrorDialogService } from '../../shared/services/error-dialog.service';
import { signal } from '@angular/core';

@Service()
export class ErrorHandlerService extends ErrorHandler {

  private errorDialogService = inject(ErrorDialogService);

  redirect = signal<string | undefined>(undefined);


  setRedirect(data: { form: string }) {
    switch (data.form) {
      case "product":
        this.redirect.set("add-product");
        break;
      case "register":
        this.redirect.set("register");
        break;
      case "login":
        this.redirect.set("login");
        break;
      default:
        this.redirect.set("");
        break;
    }

  }


  handlerZodError(data: any) {
    const title = data.message;
    const message = data.errors.find((error: any) => error.message).message;
    this.setRedirect(data);
    this.errorDialogService.openDialog(title as string, message as string, this.redirect());
  }

  handlerDuplicatedKey(data: any) {
    const title = "Usuario"
    const message = data.message;
    const redirect = "register";
    this.errorDialogService.openDialog(title as string, message as string, redirect);
  }

  handlerAuthError(data: any) {
    const title = "Autorización requerida";
    const message = data.message;
    const redirect = "login";
    this.errorDialogService.openDialog(title as string, message as string, redirect);
  }

  handlerInvalidToken(data: any) {
    const title = "La sesión ha expirado";
    const message = "Para mantener la sesión abierta, presione el botón";
    const redirect = "login";
    const buttonText = "Mantener sesión abierta";
    this.errorDialogService.openDialog(title as string, message as string, redirect, buttonText);
  }

  handlerInvalidCredentials(data: any) {
    const title = "Credenciales inválidas";
    const message = data.message;
    const redirect = "login";
    this.errorDialogService.openDialog(title as string, message as string, redirect);
  }

  handlerDefaultError(data: any) {
    const title = "Error";
    const message = data.message;
    const redirect = "login";
    this.errorDialogService.openDialog(title as string, message as string, redirect);
  }
}

