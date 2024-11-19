import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://gadgetzone-api-534526154363.us-central1.run.app/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map((products: Product[]) =>
        products.map((product) => ({
          ...product,
          image_url: product.image_url || '',
        }))
      )
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    console.log('Payload enviado a POST:', product); // Verifica el payload aquí
    return this.http.post<Product>(this.apiUrl, product);
  }
  
  updateProduct(product: Product): Observable<Product> {
    console.log('Payload enviado a PUT:', product); // Verifica el payload aquí
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }  

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}