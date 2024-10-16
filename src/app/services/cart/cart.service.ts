import { Injectable } from '@angular/core';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];

  constructor() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
    }
  }

  addToCart(product: Product) {
    this.items.push(product);
    this.saveCart();
    console.log('Producto agregado al carrito:', product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  removeItem(product: Product) {
    this.items = this.items.filter(item => item !== product);
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  calculateTotal() {
    const subtotal = this.items.reduce((total, item) => total + (item.price || 0), 0);
    const tax = subtotal * 0.16; // Asumiendo un 16% de impuestos
    const shipping = this.items.length > 0 ? 50 : 0; // Ejemplo de costo de envío
    return { subtotal, tax, shipping, total: subtotal + tax + shipping };
  }
}


/*import { Injectable } from '@angular/core';
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
}*/
