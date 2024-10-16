import { Component } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cart-container">
      <h2>Carrito de Compras</h2>
      <div *ngIf="items.length > 0; else emptyCart" class="cart-items">
        <div class="cart-item" *ngFor="let item of items">
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p>Precio: {{ item.price ? '$' + item.price.toFixed(2) : 'N/A' }}</p>
          </div>
          <button class="remove-btn" (click)="removeFromCart(item)">Eliminar</button>
        </div>
      </div>

      <div *ngIf="items.length > 0" class="cart-summary">
        <h3>Resumen del Pedido</h3>
        <p>Subtotal: <span>{{ total.subtotal | currency }}</span></p>
        <p>Impuestos (16%): <span>{{ total.tax | currency }}</span></p>
        <p>Envío: <span>{{ total.shipping | currency }}</span></p>
        <h3>Total: <span>{{ total.total | currency }}</span></h3>
        <button class="buy-btn" >Comprar</button>
      </div>

      <ng-template #emptyCart>
        <p>El carrito está vacío.</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .cart-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    h2 {
      font-size: 2em;
      color: #333;
      margin-bottom: 20px;
      text-align: center;
    }

    .cart-items {
      margin-bottom: 30px;
    }

    .cart-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
      margin-bottom: 15px;
      padding: 15px;
    }

    .item-details {
      flex-grow: 1;
    }

    h3 {
      margin: 0;
      font-size: 1.5em;
      color: #555;
    }

    p {
      margin: 5px 0;
      font-size: 1em;
      color: #777;
    }

    .remove-btn {
      background-color: #e74c3c;
      border: none;
      color: #fff;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1em;
      transition: background-color 0.3s ease;
    }

    .remove-btn:hover {
      background-color: #c0392b;
    }

    .buy-btn {
      background-color: darkgreen;
      border: none;
      color: #fff;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1em;
      transition: background-color 0.3s ease;
    }

    .buy-btn:hover {
      background-color: green;
    }


    .cart-summary {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
      margin-top: 20px;
    }

    .cart-summary h3 {
      font-size: 1.5em;
      color: #333;
      margin-bottom: 15px;
    }

    .cart-summary p {
      display: flex;
      justify-content: space-between;
      font-size: 1.2em;
      margin: 10px 0;
    }

    .cart-summary p span {
      font-weight: bold;
      color: #333;
    }

    .cart-summary h3 span {
      color: #2ecc71;
    }

    @media (max-width: 768px) {
      .cart-container {
        padding: 15px;
      }

      .cart-item {
        flex-direction: column;
        align-items: flex-start;
      }

      .remove-btn {
        width: 100%;
        margin-top: 10px;
      }
    }
  `]
})
export class CartComponent {
  items: Product[] = [];
  total = { subtotal: 0, tax: 0, shipping: 0, total: 0 };

  constructor(private cartService: CartService) {
    this.items = this.cartService.getItems();
    this.calculateTotal();
  }

  removeFromCart(product: Product) {
    this.cartService.removeItem(product);
    this.items = this.cartService.getItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartService.calculateTotal();
  }
}



/*import { Component } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Carrito de Compras</h2>
    <div *ngIf="items.length > 0; else emptyCart">
      <div *ngFor="let item of items">
        <h3>{{ item.name }}</h3>
        <p>Precio: {{ item.price ? '$' + item.price.toFixed(2) : 'N/A' }}</p>
      </div>
    </div>
    <ng-template #emptyCart>
      <p>El carrito está vacío.</p>
    </ng-template>
  `
})
export class CartComponent {
  items: Product[] = [];

  constructor(private cartService: CartService) {
    this.items = this.cartService.getItems();
  }
}*/

