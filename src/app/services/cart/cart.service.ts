import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'https://gadgetzone-api-534526154363.us-central1.run.app/cart';

  constructor(private http: HttpClient) {}

  addToCart(productId: number, userId: number, quantity: number = 1): Observable<CartItem> {
    const cartItem = { userId, productId, quantity };
    return this.http.post<CartItem>(this.apiUrl, cartItem);
  }

  getCartItems(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/${userId}`);
  }

  removeCartItem(cartId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cartId}`);
  }

  updateCartItemQuantity(cartId: number, quantity: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${cartId}`, { quantity });
  }


  createCheckoutSession(userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-checkout-session/${userId}`, {});
  }

  getReceipt(userId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/receipt/${userId}`, {
      responseType: 'blob',
    });
  }

}
