import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl:'./product-list.component.css',
  standalone: true,
  imports: [CommonModule, RouterModule] // Asegúrate de importar RouterModule aquí
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(
      products => {
        console.log('Productos recibidos:', products); // Verificar la estructura de los productos
        this.products = products;
      },
      error => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }
  
  getFormattedPrice(price: any): string {
    const numericPrice = parseFloat(price);
    return !isNaN(numericPrice) ? numericPrice.toFixed(2) : '0.00';
  }
  

}
