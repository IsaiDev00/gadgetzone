import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, FormsModule], // Añade FormsModule aquí
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent {
  products: Product[] = [];
  newProduct: Product = { id: 0, name: '', description: '', price: 0, stock: 0, imageUrl: '' };

  constructor(private productService: ProductService) {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  addProduct() {
    this.productService.addProduct(this.newProduct);
    this.loadProducts();
    this.newProduct = { id: 0, name: '', description: '', price: 0, stock: 0, imageUrl: '' };
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product);
    this.loadProducts();
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId);
    this.loadProducts();
  }
}
