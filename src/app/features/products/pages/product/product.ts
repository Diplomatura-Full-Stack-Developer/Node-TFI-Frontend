import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { DiscountPipe } from '../../../../shared/pipes/discount.pipe';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { effect } from '@angular/core';
import { CartService } from '../../../cart/services/cart.service';
import { Skeleton } from '../../../../shared/ui/skeleton/skeleton';
@Component({
  selector: 'app-product',
  imports: [MatButtonModule, MatCardModule, CurrencyPipe, DiscountPipe, MatIconModule, Skeleton],
  templateUrl: './product.html',
})

export class Product {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);

  private readonly productId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id'))),
    { initialValue: this.route.snapshot.paramMap.get('id') },
  );

  private readonly loadProduct = effect(() => {
    const id = this.productId();
    if (!id) {
      return;
    }
    this.productService.getProductByProductId(id);
  });


  product = this.productService.selectedProduct;
  error = this.productService.error;
  isLoading = this.productService.isLoading;


  addProductToCart(productId: string): void {
    this.cartService.addProductToCart(productId);
  }
}


export default Product;
