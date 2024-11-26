import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product.model';
import { HighlightBannerComponent } from '../highlight-banner/highlight-banner.component';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, HighlightBannerComponent, FormsModule]
})
export class ProductListComponent {
  products: Product[] = [];
  searchQuery: string = '';
  private searchSubject: Subject<string> = new Subject();

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
    this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
      this.performSearch(query);
    });
  }

  onSearchInput(event: any) {
    const query = event.target.value;
    this.searchSubject.next(query);
  }

  getFormattedPrice(price: any): string {
    const numericPrice = parseFloat(price);
    return !isNaN(numericPrice) ? numericPrice.toFixed(2) : '0.00';
  }

  isLCP(product: Product): boolean {
    return this.products.indexOf(product) === 0;
  }

  performSearch(query: string) {
    if (query.trim()) {
      this.productService.searchProducts(query).subscribe(
        (products) => {
          this.products = products;
        },
        (error) => {
          console.error('Error al buscar productos:', error);
        }
      );
    } else {
      this.loadProducts();
    }
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (products) => {
        console.log('Productos recibidos:', products);
        this.products = products;
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  searchProducts() {
    if (this.searchQuery.trim()) {
      this.productService.searchProducts(this.searchQuery).subscribe(
        (products) => {
          this.products = products;
          console.log('Resultados de la búsqueda:', products);
        },
        (error) => {
          console.error('Error al buscar productos:', error);
        }
      );
    } else {
      this.loadProducts();
    }
  }
}
