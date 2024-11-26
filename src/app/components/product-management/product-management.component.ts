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
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  validateProductFields(): boolean {
    const { name, description, specifications, price, stock, image_url } = this.selectedProduct;
    return !!(name && description && specifications && price > 0 && stock > 0 && image_url);
  }

  showSuccessMessage(message: string) {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
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
    if (this.validateProductFields()) {
      this.productService.addProduct(this.selectedProduct).subscribe(
        () => {
          this.loadProducts();
          this.clearSelection();
          this.errorMessage = '';
          this.showSuccessMessage('Producto agregado exitosamente.');
        },
        (error) => {
          console.error('Error al agregar producto:', error);
          this.errorMessage = 'Ocurrió un error al agregar el producto. Inténtalo nuevamente.';
        }
      );
    } else {
      this.errorMessage = 'Todos los campos son obligatorios. Por favor, complétalos.';
    }
  }  

  editProduct(product: Product) {
    this.selectedProduct = { ...product };
    this.isEditing = true;
    this.errorMessage = '';
  }

  updateProduct() {
    if (this.validateProductFields()) {
      this.productService.updateProduct(this.selectedProduct).subscribe(
        (response: { success: boolean; message: string; product?: Product }) => {
          if (response && response.success) {
            this.loadProducts();
            this.clearSelection();
            this.errorMessage = '';
            this.showSuccessMessage('Producto actualizado exitosamente.');
          } else {
            this.errorMessage = response.message || 'Ocurrió un error desconocido.';
          }
        },
        (error) => {
          console.error('Error al actualizar producto:', error);
          this.errorMessage = 'Ocurrió un error al actualizar el producto. Inténtalo nuevamente.';
        }
      );
    } else {
      this.errorMessage = 'Todos los campos son obligatorios. Por favor, complétalos.';
    }
  }  

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(
      (response: { success: boolean; message: string }) => {
        if (response && response.success) {
          this.loadProducts();
          this.showSuccessMessage(response.message || 'Producto eliminado exitosamente.');
        } else {
          this.errorMessage = response.message || 'Ocurrió un error al eliminar el producto.';
        }
      },
      (error) => {
        console.error('Error al eliminar producto:', error);
        this.errorMessage = 'Ocurrió un error al eliminar el producto. Inténtalo nuevamente.';
      }
    );
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
    this.errorMessage = '';
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
