import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartItem } from '../../models/cart.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  firebaseUserId: string | null = null;

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit() {
    // Obtener el firebaseUserId del usuario autenticado
    this.authService.getFirebaseUserId().subscribe((id) => {
      if (id) {
        this.firebaseUserId = id;
        this.loadCartItems();
      } else {
        console.error('Usuario no autenticado');
      }
    });
  }

  loadCartItems() {
    if (this.firebaseUserId) {
      this.cartService.getCartItems(this.firebaseUserId).subscribe(
        (cartItems) => {
          console.log('Items en el carrito recibidos:', cartItems);

          // Unificar productos duplicados
          const itemMap = new Map<number, CartItem>();
          cartItems.forEach((item) => {
            if (itemMap.has(item.productId)) {
              itemMap.get(item.productId)!.quantity += item.quantity;
            } else {
              itemMap.set(item.productId, { ...item });
            }
          });

          this.cartItems = Array.from(itemMap.values());
        },
        (error) => console.error('Error al obtener los ítems del carrito:', error)
      );
    }
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem.cartId).subscribe(
      () => {
        this.cartItems = this.cartItems.filter((item) => item.cartId !== cartItem.cartId);
        console.log(`Producto con ID ${cartItem.cartId} eliminado del carrito`);
      },
      (error) => console.error('Error al eliminar el ítem del carrito:', error)
    );
  }

  trackByCartItem(index: number, item: CartItem): number {
    return item.cartId;
  }

  increaseQuantity(cartItem: CartItem) {
    this.cartService.updateCartItemQuantity(cartItem.cartId, cartItem.quantity + 1).subscribe(
      () => {
        cartItem.quantity++;
      },
      (error) => console.error('Error al incrementar la cantidad:', error)
    );
  }

  decreaseQuantity(cartItem: CartItem) {
    if (cartItem.quantity > 1) {
      this.cartService.updateCartItemQuantity(cartItem.cartId, cartItem.quantity - 1).subscribe(
        () => {
          cartItem.quantity--;
        },
        (error) => console.error('Error al disminuir la cantidad:', error)
      );
    } else {
      this.removeFromCart(cartItem);
    }
  }

  getProductPrice(cartItem: CartItem): string {
    const price = parseFloat(cartItem.price as unknown as string);
    if (!isNaN(price)) {
      return `$${price.toFixed(2)}`;
    }
    console.warn('Precio no válido para el producto:', cartItem);
    return 'N/A';
  }

  getTotalPrice(): string {
    const total = this.cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price as unknown as string);
      if (!isNaN(price)) {
        return sum + price * item.quantity;
      }
      return sum;
    }, 0);
    return `$${total.toFixed(2)}`;
  }

  pay() {
    if (this.firebaseUserId) {
      this.cartService.createCheckoutSession(this.firebaseUserId).subscribe(
        (response: any) => {
          if (response.url) {
            window.location.href = response.url;
          }
        },
        (error) => console.error('Error al iniciar el proceso de pago:', error)
      );
    }
  }

  downloadReceipt() {
    if (this.firebaseUserId) {
      this.cartService.getReceipt(this.firebaseUserId).subscribe(
        (response) => {
          const blob = new Blob([response], { type: 'application/xml' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'receipt.xml';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        (error) => console.error('Error al descargar el recibo:', error)
      );
    }
  }
}
