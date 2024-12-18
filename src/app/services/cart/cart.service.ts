import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'https://gadgetzone-api-534526154363.us-central1.run.app/cart';

  constructor(private http: HttpClient) {}

  addToCart(productId: number, firebaseUserId: string, quantity: number = 1): Observable<CartItem> {
    const cartItem = { firebaseUserId, productId, quantity };
    return this.http.post<CartItem>(this.apiUrl, cartItem).pipe(
      catchError((error) => {
        console.error('Error al agregar producto al carrito:', error);
        return throwError(() => new Error('No se pudo agregar el producto al carrito.'));
      })
    );
  }

  downloadReceipt(firebaseUserId: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/download-receipt/${firebaseUserId}`, {
      responseType: 'text',
    });
  }  

  getCartItems(firebaseUserId: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/${firebaseUserId}`);
  }

  removeCartItem(cartId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cartId}`);
  }

  updateCartItemQuantity(cartId: number, quantity: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${cartId}`, { quantity });
  }

  createCheckoutSession(firebaseUserId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-checkout-session/${firebaseUserId}`, {});
  }

  getReceipt(firebaseUserId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/receipt/${firebaseUserId}`, {
      responseType: 'blob',
    });
  }  

  checkoutSuccess(firebaseUserId: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/checkout-success`, { firebaseUserId }, { responseType: 'text' });
  }  

  clearCart(firebaseUserId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clear/${firebaseUserId}`);
  }  
}