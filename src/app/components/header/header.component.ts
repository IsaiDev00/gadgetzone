import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgClass],
  template: `
    <header class="bg-white">
      <nav class="navbar navbar-expand-lg navbar-light container">
        <a class="navbar-brand" routerLink="/productos">
          <h1 class="h4">GZ</h1>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link icon-link" routerLink="/carrito"><i class="bi bi-cart"></i></a>
            </li>
            <li class="nav-item">
              <a class="nav-link icon-link" routerLink="/cuenta"><i class="bi bi-person"></i></a>
            </li>
            <li class="nav-item">
              <a class="nav-link icon-link" routerLink="/adminProducto"><i class="bi bi-gear"></i></a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    header {
      padding: 10px 0;
      box-shadow: none; /* Eliminado el box-shadow */
      border-bottom: none; /* Asegurarse de que no haya borde */
    }
    .navbar-brand h1 {
      font-family: 'font1', sans-serif;
      color: #333;
    }
    .nav-link {
      color: #333;
      font-size: 1.1em;
      transition: color 0.3s;
    }
    .nav-link:hover {
      color: #0056b3;
    }
    .icon-link i {
      font-size: 1.5em;
    }
  `]
})
export class HeaderComponent {}
