import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CartItem } from '../../models/cart.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCartItems();
  }

  getProductPrice(cartItem: CartItem): string {
    if (cartItem?.price != null) {
      const price = parseFloat(cartItem.price as unknown as string);
      if (!isNaN(price)) {
        return `$${price.toFixed(2)}`;
      }
    }
    console.warn('El precio del producto no es un número válido:', cartItem);
    return 'N/A';
  }

  loadCartItems() {
    const userId = 1;
    this.cartService.getCartItems(userId).subscribe(
      (cartItems) => {
        console.log('Items en el carrito recibidos:', cartItems);
  
        // Unificar productos duplicados
        const itemMap = new Map<number, CartItem>();
        cartItems.forEach(item => {
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

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem.cartId).subscribe(
      () => {
        // Remover el ítem del carrito después de eliminarlo de la base de datos
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
      // Si la cantidad es 1, se eliminará del carrito
      this.removeFromCart(cartItem);
    }
  }

  // Calcular el precio total de los ítems en el carrito
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

  // Método para manejar el pago
  pay() {
    const userId = 1;
  
    this.cartService.createCheckoutSession(userId).subscribe(
      (response: any) => {
        if (response.url) {
          // Redirigir al enlace de Stripe, Stripe se encargará de redirigir a la URL de éxito al finalizar
          window.location.href = response.url;
        }
      },
      (error) => {
        console.error('Error al iniciar el proceso de pago:', error);
      }
    );
  }

  downloadReceipt() {
    const userId = 1; // Suponiendo que el userId es 1
  
    this.cartService.getReceipt(userId).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/xml' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'receipt.xml';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error al descargar el recibo:', error);
      }
    );
  }
  
}


