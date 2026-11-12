import { IProduct } from "../../products/interfaces/product.interface";
import { computed, signal } from "@angular/core";
import { inject } from "@angular/core";
import { ICartProduct } from "../interfaces/cart.interface";
import { HttpClient } from "@angular/common/http";
import { Service } from "@angular/core";
import { IUser } from "../../users/interfaces/user.interface";
import { AuthService } from "../../auth/services/auth.service";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { finalize } from "rxjs/operators";
import { effect, untracked } from "@angular/core";
@Service()
export class CartService {


  private readonly http = inject(HttpClient);
  private authService = inject(AuthService);
  private router = inject(Router);
  private apiUrl = environment.apiUrl;

  isLoading = signal(false);

  user = computed(() => this.authService.user() as unknown as IUser | null);

  userCart = signal<{ cartId: string, products: ICartProduct[], total: number, productId: string }>({ cartId: '', products: [], total: 0, productId: '' });

  productsCart = signal<ICartProduct[]>([]);

  private readonly watchUser = effect(() => {
    const userId = this.user()?.userId;
    if (!userId) {
      this.productsCart.set([]);
      return;
    }
    untracked(() => this.getUserCart());
  });

  getUserCart(): void {
    this.isLoading.set(true);
    this.http.get<{ cartId: string; products: { productId: string; quantity: number }[]; total: number }>(
      `${this.apiUrl}/cart/${this.user()?.userId}`,
    ).subscribe({
      next: (res) => {
        const itemsCart = res.products ?? [];
        this.userCart.set({
          cartId: res.cartId ?? '',
          products: [],
          total: res.total ?? 0,
          productId: this.userCart().productId,
        });
        if (itemsCart.length === 0) {
          this.productsCart.set([]);
          this.isLoading.set(false);
          return;
        }
        this.loadProducts(itemsCart);
      },
      error: () => {
        this.productsCart.set([]);
        this.isLoading.set(false);
      },
    });
  }

  private loadProducts(cartItems: { productId: string; quantity: number }[]): void {
    this.productsCart.set([]);
    let pending = cartItems.length;

    cartItems.forEach((cartItem) => {
      this.http
        .get<{ data: IProduct }>(`${this.apiUrl}/products/${cartItem.productId}`)
        .pipe(finalize(() => {
          pending -= 1;
          if (pending === 0) {
            this.isLoading.set(false);
          }
        }))
        .subscribe({
          next: (res) => {
            const item: ICartProduct = {
              ...res.data,
              productId: res.data.productId ?? cartItem.productId,
              quantity: cartItem.quantity,
            };
            this.productsCart.update((current) => [...current, item]);
          },
        });
    });
  }

  addProductToCart(productId: string): void {

    if (this.userCart().cartId !== '') {
      this.http.post(`${this.apiUrl}/cart/${this.userCart().cartId}/products`, { productId }).subscribe((res: any) => {
        this.userCart.set({ cartId: res.cartId, products: res.products, total: res.total, productId });
        this.router.navigate(['/products-cart']);
      });
    }
    else {
      this.http.post(`${this.apiUrl}/cart`, { userId: this.user()?.userId, productId }).subscribe((res: any) => {
        this.userCart.set({ cartId: res.cartId, products: res.products, total: res.total, productId });
        this.router.navigate(['/products-cart']);
      });
    }
  }


  removeProductFromCart(productId: string): void {
    const cartId = this.userCart().cartId;
    this.http
      .delete(`${this.apiUrl}/cart/${cartId}/products/${productId}`)
      .subscribe(() => {
        this.getUserCart();
      });
  }
}

