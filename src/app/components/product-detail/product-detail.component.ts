import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true, // Añadido para definir el componente como independiente
  imports: [CommonModule], // Importar CommonModule para habilitar directivas como *ngIf
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;  // Cambiado de 'undefined' a 'null' para indicar claramente cuando no se ha cargado.
  loading: boolean = true; // Indicador de carga

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id).subscribe(
      (product: Product) => {
        console.log('Producto obtenido:', product);
        if (product) {
          // Convertir el precio si es una cadena, o dejarlo igual si ya es un número
          const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
          console.log('Precio (convertido):', price);
        }
        this.product = product;
        this.loading = false; // Producto cargado, detener la carga
      },
      (error: any) => {
        console.error('Error al cargar el producto:', error);
        this.loading = false; // Error al cargar, detener la carga
      }
    );
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      console.log('Producto agregado al carrito:', this.product);
    }
  }

  getFormattedPrice(): string {
    if (this.product?.price != null) {
      // Si price es un número, usarlo directamente; si es una cadena, convertirlo
      const priceNumber = typeof this.product.price === 'number' ? this.product.price : parseFloat(this.product.price);
      if (!isNaN(priceNumber)) {
        return `$${priceNumber.toFixed(2)}`;
      }
    }
    return 'N/A';
  }
  
  
}
