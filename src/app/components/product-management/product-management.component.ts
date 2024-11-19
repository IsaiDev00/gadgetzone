import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product = {
    id: 0,
    name: '',
    description: '',
    specifications: '',
    price: 0,
    image_url: '',
    stock: 0,
    active: true,
  };
  
  isEditing = false;
  searchTerm: string = '';
  currentPage = 0;
  itemsPerPage = 10;
  isSearchActive = false;

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
    this.productService.addProduct(this.selectedProduct).subscribe(() => {
      this.loadProducts();
      this.clearSelection();
    });
  }

  editProduct(product: Product) {
    this.selectedProduct = { ...product };
    this.isEditing = true;
  }

  updateProduct() {
    this.productService.updateProduct(this.selectedProduct).subscribe(() => {
      this.loadProducts();
      this.clearSelection();
    });
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(() => this.loadProducts());
  }

  clearSelection() {
    this.selectedProduct = {
      id: 0,
      name: '',
      description: '',
      specifications: '',
      price: 0,
      stock: 0,
      image_url: '',
      active: true,
    };
    this.isEditing = false;
  }

  filteredProducts() {
    const lowerCaseSearchTerm = this.searchTerm ? this.searchTerm.toLowerCase() : '';
    const filtered = this.products.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  
    this.isSearchActive = lowerCaseSearchTerm.length > 0;
  
    if (this.isSearchActive) {
      return filtered;
    }
  
    const start = this.currentPage * this.itemsPerPage;
    return filtered.slice(start, start + this.itemsPerPage);
  }  

  get pages() {
    const totalItems = this.isSearchActive
      ? this.filteredProducts().length
      : this.products.length;
    return Array(Math.ceil(totalItems / this.itemsPerPage)).fill(0);
  }  

  goToPage(page: number) {
    if (!this.isSearchActive) {
      this.currentPage = page;
    }
  }
  
}
