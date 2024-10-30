import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'], // Corregido styleUrls
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AdminProductComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product = { id: 0, name: '', description: '', price: 0, stock: 0, imageUrl: '', active: true }; // Añadido 'active'
  isEditing = false;
  searchTerm: any;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  addProduct() {
    this.productService.addProduct(this.selectedProduct).subscribe(
      () => {
        this.loadProducts(); // Recargar lista de productos
        this.clearSelection();
      },
      (error) => {
        console.error('Error al agregar producto:', error);
      }
    );
  }

  editProduct(product: Product) {
    this.selectedProduct = { ...product };
    this.isEditing = true;
  }

  updateProduct() {
    this.productService.updateProduct(this.selectedProduct).subscribe(
      () => {
        this.loadProducts();
        this.clearSelection();
      },
      (error) => {
        console.error('Error al actualizar producto:', error);
      }
    );
  }

  deleteProduct(productId: number) { // Asegurando que 'productId' sea de tipo number
    this.productService.deleteProduct(productId).subscribe(
      () => this.loadProducts(),
      (error) => console.error('Error al eliminar producto:', error)
    );
  }

  clearSelection() {
    this.selectedProduct = { id: 0, name: '', description: '', price: 0, stock: 0, imageUrl: '', active: true }; // Añadido 'active'
    this.isEditing = false;
  }
}
