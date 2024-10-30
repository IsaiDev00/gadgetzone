import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'https://gadgetzone-queries-534526154363.us-central1.run.app/cart';

  constructor(private http: HttpClient) {}

  // Agregar producto al carrito en la base de datos
  addToCart(productId: number, userId: number, quantity: number = 1): Observable<CartItem> {
    const cartItem = { userId, productId, quantity };
    return this.http.post<CartItem>(this.apiUrl, cartItem);
  }

  // Obtener todos los productos del carrito de un usuario específico
  getCartItems(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/${userId}`);
  }

  // Eliminar un ítem del carrito por ID
  removeCartItem(cartId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cartId}`);
  }

// Actualizar la cantidad de un ítem del carrito
updateCartItemQuantity(cartId: number, quantity: number): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${cartId}`, { quantity });
}


}
