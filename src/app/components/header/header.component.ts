// header.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgClass],
  template: `
    <header (mouseenter)="hover(true)" (mouseleave)="hover(false)" [ngClass]="{ 'hovered': isHovered }">
      <nav class="container">
        <div class="logo">
          <a routerLink="/">
          <h1>GZ</h1>
          </a>
        </div>
        <ul>
          <li><a routerLink="/productos"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-box"><path d="M21 16V8a2 2 0 0 0-1-1.73L12 2 4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73L12 22l8-4.27A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg></a></li>
          <li><a routerLink="/carrito"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61l1.6-9H6"></path></svg></a></li>
          <li><a routerLink="/cuenta"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20.42 19.61A16 16 0 0 0 12 17a16 16 0 0 0-8.42 2.61"></path><circle cx="12" cy="7" r="4"></circle></svg></a></li>
          <li> <a routerLink="/adminProducto"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"> <circle cx="12" cy="12" r="3"></circle> <path d="M19.4 15.6l-1.1-.9a7.9 7.9 0 0 0 .2-1.5 7.9 7.9 0 0 0-.2-1.5l1.1-.9a1 1 0 0 0 .2-1.4l-1.7-1.7a1 1 0 0 0-1.4-.2l-1.1.9a7.9 7.9 0 0 0-1.5-.2 7.9 7.9 0 0 0-1.5.2l-.9-1.1a1 1 0 0 0-1.4.2L4.6 9.6a1 1 0 0 0 .2 1.4l1.1.9a7.9 7.9 0 0 0-.2 1.5 7.9 7.9 0 0 0 .2 1.5l-1.1.9a1 1 0 0 0-.2 1.4l1.7 1.7a1 1 0 0 0 1.4.2l1.1-.9a7.9 7.9 0 0 0 1.5.2 7.9 7.9 0 0 0 1.5-.2l.9 1.1a1 1 0 0 0 1.4-.2l1.7-1.7a1 1 0 0 0-.2-1.4z"></path> </svg> Administrar Productos</a></li>
        </ul>
      </nav>
    </header>
  `,
  styles: [`
    header {
      background-color: #333;
      color: white;
      padding: 10px 0;
      transition: background-color 0.3s ease;
    }
    header.hovered {
      background-color: black;
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      display: flex;
      justify-content: center;
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
      font-size: 1.5em;
    }
    img {
      height: 40px;
    }
    svg {
      width: 24px;
      height: 24px;
      stroke: white;
    }
    h1 {
    font-family: 'font1', sans-serif;
  }
  `]
})
export class HeaderComponent {
  isHovered = false;

  hover(state: boolean) {
    this.isHovered = state;
  }
}
