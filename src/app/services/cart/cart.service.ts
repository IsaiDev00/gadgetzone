import { Injectable } from '@angular/core';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root' // Esto hace que el servicio esté disponible globalmente
})
export class CartService {
  private items: Product[] = [];

  addToCart(product: Product) {
    this.items.push(product);
    console.log('Producto agregado al carrito:', product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
  }
}
