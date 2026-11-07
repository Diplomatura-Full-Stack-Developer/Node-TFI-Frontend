import { Component, inject } from '@angular/core';
import { Navbar } from '../ui/navbar/navbar';
import { AuthService } from '../../features/auth/services/auth.service';
import { computed } from '@angular/core';
import { ProductService } from '../../features/products/services/product.service';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { IUser } from '../../features/users/interfaces/user.interface';
import { CartService } from '../../features/cart/services/cart.service'



@Component({
  selector: 'app-header',
  imports: [Navbar, MatIcon],
  templateUrl: './header.html'
})
export class Header {

  private router = inject(Router);
  private authService = inject(AuthService);
  public cartService = inject(CartService);

  totalCartQuantity = computed(() =>
    this.cartService.productsCart().reduce((total, item) => total + item.quantity, 0),
  );

  user = computed(() => this.authService.user() as unknown as IUser | undefined);
  setTitle = computed(() => this.user()?.name ? `Hola, ${this.user()?.name}` : 'Angular');

  openCart = () => {
    this.router.navigate(['/products-cart']);
  };


}
