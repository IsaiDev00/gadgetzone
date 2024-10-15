import { Component } from '@angular/core';
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
}

