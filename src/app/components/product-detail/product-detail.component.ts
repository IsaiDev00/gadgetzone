import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="product">
      <h2>{{ product.name }}</h2>
      <img [src]="product.imageUrl" [alt]="product.name">
      <p>{{ product.description }}</p>
      <p>Precio: ${{ product.price.toFixed(2) }}</p>
      <p>Stock: {{ product.stock }}</p>
      <button class="btn btn-primary" (click)="addToCart()">Agregar al Carrito</button>
    </div>
  `
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id).subscribe(product => {
      this.product = product;
    });
  }

  addToCart() {
    // Implementar lógica para agregar al carrito
    console.log('Producto agregado al carrito');
  }
}