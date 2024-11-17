import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../models/product.model';

interface ApiProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  specifications: string;
  image_url: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://gadgetzone-api-534526154363.us-central1.run.app/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<ApiProduct[]>(this.apiUrl).pipe(
      map((products: ApiProduct[]) => 
        products.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          imageUrl: product.image_url,
          active: product.active
        }))
      )
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<ApiProduct>(`${this.apiUrl}/${id}`).pipe(
      map((product: ApiProduct) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        specifications: product.specifications, // Incluye especificaciones
        price: product.price,
        stock: product.stock,
        imageUrl: product.image_url,
        active: product.active
      }))
    );
  }  
  
  
  addProduct(product: Product): Observable<Product> {
    const apiProduct = {
      ...product,
      image_url: product.imageUrl,
      imageUrl: undefined
    };
    return this.http.post<Product>(this.apiUrl, apiProduct);
  }

  updateProduct(product: Product): Observable<Product> {
    const apiProduct = {
      ...product,
      image_url: product.imageUrl,
      imageUrl: undefined
    };
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, apiProduct);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}