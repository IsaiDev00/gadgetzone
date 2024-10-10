import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-management.component.html',
  //styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  productForm: FormGroup;
  editingProduct: Product | null = null;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  createProduct(): void {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      this.productService.createProduct(newProduct);
      this.loadProducts();
      this.productForm.reset();
    }
  }

  editProduct(product: Product): void {
    this.editingProduct = product;
    this.productForm.patchValue(product);
  }

  updateProduct(): void {
    if (this.productForm.valid && this.editingProduct) {
      const updatedProduct: Product = { ...this.editingProduct, ...this.productForm.value };
      this.productService.updateProduct(updatedProduct);
      this.loadProducts();
      this.productForm.reset();
      this.editingProduct = null;
    }
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId);
    this.loadProducts();
  }

  cancelEdit(): void {
    this.editingProduct = null;
    this.productForm.reset();
  }
}