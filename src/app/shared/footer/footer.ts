import { Component, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../features/auth/services/auth.service';
import { inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { IUser } from '../../features/users/interfaces/user.interface';
@Component({
  selector: 'app-footer',
  imports: [MatIconModule, RouterLink],
  templateUrl: './footer.html',
})
export class Footer {

  private authService = inject(AuthService);

  user = computed(() => this.authService.user() as unknown as IUser | undefined);

  menuItems = computed<{ label: string; routerLink?: string; action?: () => void }[]>(() => [
    {
      label: 'Inicio',
      routerLink: '/'
    },
    {
      label: 'Nosotros',
      routerLink: '/about'
    },
    {
      label: 'Contacto',
      routerLink: '/contact'
    },
    ...(this.user() ? [
      {
        label: 'Cerrar sesión',
        action: () => this.logout()
      }
    ] : [
      {
        label: 'Iniciar sesión',
        routerLink: '/login'
      }
    ])
  ]);

  logout = () => {
    this.authService.logoutUser();
  };


}
