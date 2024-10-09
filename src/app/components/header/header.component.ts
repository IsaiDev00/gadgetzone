import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header>
      <nav class="container">
        <h1>GadgetZone</h1>
        <ul>
          <li><a routerLink="/">Inicio</a></li>
          <li><a routerLink="/productos">Productos</a></li>
          <li><a routerLink="/carrito">Carrito</a></li>
          <li><a routerLink="/cuenta">Mi Cuenta</a></li>
        </ul>
      </nav>
    </header>
  `,
  styles: [`
    header {
      background-color: #333;
      color: white;
      padding: 10px 0;
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    ul {
      list-style-type: none;
      padding: 0;
      display: flex;
    }
    li {
      margin-left: 20px;
    }
    a {
      color: white;
      text-decoration: none;
    }
  `]
})
export class HeaderComponent {}