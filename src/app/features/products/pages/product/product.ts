import { Component, signal } from '@angular/core';
import { inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { DiscountPipe } from '../../../../shared/pipes/discount.pipe';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../auth/services/auth.service';
import { CartService } from '../../../cart/services/cart.service';
import { IUser } from '../../../users/interfaces/user.interface';
import { IProduct } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product',
  imports: [MatButtonModule, MatCardModule, CurrencyPipe, DiscountPipe, MatIconModule],
  templateUrl: './product.html',
})
export class Product {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  error = signal<string | null>(null);

  user = computed(() => this.authService.user() as unknown as IUser | null);
  products = computed(() => this.productService.products());
  product = computed(() => this.products().find((item) => item.productId === this.route.snapshot.paramMap.get('id')));



  addProductToCart(productId: string): void {
    this.cartService.addProductToCart(productId as unknown as string);

  }

}
export default Product;
