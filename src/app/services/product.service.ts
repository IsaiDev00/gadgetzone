import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

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

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProduct(id: number): Observable<Product | undefined> {
    return of(this.products.find(product => product.id === id));
  }

  // Aquí se implementarían métodos para agregar, actualizar y eliminar productos
}