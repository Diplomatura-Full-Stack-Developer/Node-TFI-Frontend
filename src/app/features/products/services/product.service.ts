import { inject, Service, signal } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Service()
export class ProductService {

  private apiUrl = environment.apiUrl;

  private http = inject(HttpClient);


  products = signal<IProduct[]>([]);

  isLoading = signal<boolean>(false);

  private readonly _error = signal<string | null>(null);
  readonly error = this._error.asReadonly();

  private toProduct(raw: IProduct & { productId?: string }): IProduct {
    return {
      ...raw,
      productId: raw.productId ?? String(raw.productId),
    };
  }

  getProducts(): void {
    this.isLoading.set(true);
    this.http
      .get<Array<IProduct & { productId?: string }>>(`${this.apiUrl}/products`)
      .subscribe((data) => {
        this.products.set(data.map((item) => this.toProduct(item)));
        this.isLoading.set(false);
      });
  }

  getProductByproductId(productId: string): void {
    this.isLoading.set(true);
    this.http
      .get<{ message: string; data: IProduct & { productId?: string } }>(
        `${this.apiUrl}/products/${productId}`,
      )
      .subscribe((response) => {
        const raw = response?.data;
        this.products.set(raw ? [this.toProduct(raw)] : []);
        this.isLoading.set(false);
      });
  }


  addProduct(product: IProduct): void {
    this.http.post<IProduct & { productId?: string }>(`${this.apiUrl}/product`, product)
      .subscribe((response) => {
        this.products.set([this.toProduct(response as IProduct & { productId?: string })]);
      });
  }


  searchProducts(search: string) {
    return this.products().filter((p) => p.category.toLowerCase().includes(search.toLowerCase()));
  }

}
