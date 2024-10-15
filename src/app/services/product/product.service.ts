import { Injectable } from '@angular/core';
import { Product } from '../../models/product.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Smartphone XYZ',
      description: 'Último modelo con cámara de alta resolución',
      price: 599.99,
      imageUrl: 'assets/smartphone.jpg',
      stock: 50
    },
    // Agrega más productos aquí
  ];

  getProduct(id: number): Observable<Product | undefined> {
    return of(this.products.find(product => product.id === id));
  }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  addProduct(product: Product): void {
    product.id = this.products.length + 1;
    this.products.push(product);
  }

  updateProduct(product: Product): void {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
    }
  }

  deleteProduct(productId: number): void {
    this.products = this.products.filter(product => product.id !== productId);
  }
}
