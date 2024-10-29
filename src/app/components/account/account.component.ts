
/*

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="account-container">
    <div class="account-header">
      <h2>Perfil de Cuenta</h2>
      <!--<button class="edit-button">Editar Perfil</button>-->
    </div>
    <div class="account-details">
      <p><strong>Nombre Completo:</strong> {{ user.fullName }}</p>
      <p><strong>Correo Electrónico:</strong> {{ user.email }}</p>
    </div>

    <h3>Historial de Pedidos</h3>
    <div *ngIf="orders.length > 0; else noOrders" class="order-list">
      <div class="order-item" *ngFor="let order of orders">
        <div class="order-header">
          <p><strong>Pedido #{{ order.id }}</strong></p>
          <p>{{ order.date | date:'medium' }}</p>
        </div>
        <div class="order-body">
          <p>Total: <strong>{{ order.total | currency }}</strong></p>
          <p class="order-status" [ngClass]="getOrderStatusClass(order.status)">
            Status: {{ order.status }}
          </p>
        </div>
      </div>
    </div>
    <ng-template #noOrders>
      <p>No tienes pedidos en tu historial.</p>
    </ng-template>
  </div>
`,
styles: [`
  .account-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
  }

  .account-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 2.5em;
    color: #333;
    margin: 0;
  }

  .edit-button {
    background-color: #007bff;
    color: white;
    padding: 8px 12px;
    font-size: 0.9em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .edit-button:hover {
    background-color: #0056b3;
  }

  .account-details {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    margin-bottom: 30px;
  }

  .account-details p {
    font-size: 1.1em;
    color: #555;
    margin: 10px 0;
  }

  h3 {
    font-size: 1.8em;
    color: #555;
    margin-bottom: 20px;
  }

  .order-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .order-item {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 15px;
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }

  .order-body p {
    margin: 5px 0;
    font-size: 1.1em;
    color: #555;
  }

  .order-status {
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: bold;
    font-size: 0.9em;
  }

  .order-status.delivered {
    background-color: #28a745;
    color: white;
  }

  .order-status.in-process {
    background-color: #ffc107;
    color: white;
  }

  .order-status.pending {
    background-color: #dc3545;
    color: white;
  }

  p {
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

  getOrderStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'entregado': return 'delivered';
      case 'en proceso': return 'in-process';
      case 'pendiente': return 'pending';
      default: return '';
    }
  }
}*/
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <div class="account-container">
    <div class="account-header">
      <h2>Perfil de Cuenta</h2>
      <a style="background-color:  #d9534f;" class="btn btn-primary" [routerLink]="['/productos']">Cerrar Sesion</a>
    </div>
    <div class="account-details">
      <p><strong>Nombre Completo:</strong> {{ user.fullName }}</p>
      <p><strong>Correo Electrónico:</strong> {{ user.email }}</p>
    </div>

    <h3>Historial de Pedidos</h3>
    <div *ngIf="orders.length > 0; else noOrders" class="order-list">
      <div class="order-item" *ngFor="let order of orders">
        <div class="order-header">
          <p><strong>Pedido #{{ order.id }}</strong></p>
          <p>{{ order.date | date:'medium' }}</p>
        </div>
        <div class="order-body">
          <p>Total: <strong>{{ order.total | currency }}</strong></p>
          <p class="order-status" [ngClass]="getOrderStatusClass(order.status)">
            Status: {{ order.status }}
          </p>
        </div>
      </div>
    </div>
    <ng-template #noOrders>
      <p>No tienes pedidos en tu historial.</p>
    </ng-template>
  </div>
`,
styles: [`
  .account-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
  }

  .account-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 2.5em;
    color: #333;
    margin: 0;
  }

  .logout-button {
    background-color: #dc3545; /* Rojo para cerrar sesión */
    color: white;
    padding: 8px 12px;
    font-size: 0.9em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .logout-button:hover {
    background-color: #c82333; /* Color más oscuro al pasar el mouse */
  }

  .account-details {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    margin-bottom: 30px;
  }

  .account-details p {
    font-size: 1.1em;
    color: #555;
    margin: 10px 0;
  }

  h3 {
    font-size: 1.8em;
    color: #555;
    margin-bottom: 20px;
  }

  .order-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .order-item {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 15px;
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }

  .order-body p {
    margin: 5px 0;
    font-size: 1.1em;
    color: #555;
  }

  .order-status {
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: bold;
    font-size: 0.9em;
  }

  .order-status.delivered {
    background-color: #28a745;
    color: white;
  }

  .order-status.in-process {
    background-color: #ffc107;
    color: white;
  }

  .order-status.pending {
    background-color: #dc3545;
    color: white;
  }

  p {
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

  getOrderStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'entregado': return 'delivered';
      case 'en proceso': return 'in-process';
      case 'pendiente': return 'pending';
      default: return '';
    }
  }

 
}
