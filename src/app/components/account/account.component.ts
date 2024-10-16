import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="account-container">
      <h2>Datos de la Cuenta</h2>
      <div class="account-details">
        <p><strong>Nombre Completo:</strong> {{ user.fullName }}</p>
        <p><strong>Correo Electrónico:</strong> {{ user.email }}</p>
      </div>

      <h3>Historial de Pedidos</h3>
      <div *ngIf="orders.length > 0; else noOrders" class="order-list">
        <div class="order-item" *ngFor="let order of orders">
          <p>Pedido #{{ order.id }} - Fecha: {{ order.date | date:'short' }}</p>
          <p>Total: {{ order.total | currency }}</p>
          <p>Status: {{ order.status }}</p>
        </div>
      </div>
      <ng-template #noOrders>
        <p>No tienes pedidos en tu historial.</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .account-container {
      max-width: 600px;
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

    .account-details {
      margin-bottom: 30px;
    }

    h3 {
      font-size: 1.5em;
      color: #555;
      margin-bottom: 15px;
    }

    .order-list {
      margin-top: 20px;
    }

    .order-item {
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
      padding: 15px;
      margin-bottom: 15px;
    }

    p {
      margin: 5px 0;
      font-size: 1em;
      color: #777;
    }
  `]
})
export class AccountComponent {
  user = {
    fullName: 'Juan Pérez',
    email: 'juan.perez@example.com',
  };

  orders = [
    { id: 1, date: new Date(), total: 150.75, status: 'Entregado' },
    { id: 2, date: new Date(), total: 75.00, status: 'En Proceso' },
  ];
}
