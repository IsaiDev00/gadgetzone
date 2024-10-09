import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <h2>Catálogo de Productos</h2>
    <div class="product-grid">
      <div *ngFor="let product of products" class="product-card">
        <img [src]="product.imageUrl" [alt]="product.name">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>Precio: ${{ product.price.toFixed(2) }}</p>
        <button class="btn btn-primary" [routerLink]="['/producto', product.id]">Ver Detalles</button>
      </div>
    </div>
  `,
  styles: [`
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
}