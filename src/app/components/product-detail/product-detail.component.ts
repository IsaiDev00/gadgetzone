import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart/cart.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading: boolean = true;
  firebaseUserId: string | null = null; // Almacena el firebaseUserId del usuario autenticado

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService // Servicio de autenticación para obtener el firebaseUserId
  ) {}

  ngOnInit() {
    // Obtener el firebaseUserId del usuario autenticado
    this.authService.getFirebaseUserId().subscribe((id) => {
      if (id) {
        this.firebaseUserId = id;
        console.log('firebaseUserId obtenido:', id);
      } else {
        console.error('Usuario no autenticado');
      }
    });

    // Obtener el producto basado en el ID proporcionado en la ruta
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id).subscribe(
      (product: Product) => {
        console.log('Producto obtenido:', product);
        if (product) {
          const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
          console.log('Precio (convertido):', price);
        }
        this.product = product;
        this.loading = false;
      },
      (error: any) => {
        console.error('Error al cargar el producto:', error);
        this.loading = false;
      }
    );
  }

  addToCart() {
    if (this.product && this.firebaseUserId) {
      this.cartService.addToCart(this.product.id, this.firebaseUserId).subscribe(
        () => console.log('Producto agregado al carrito en la base de datos:', this.product),
        (error) => console.error('Error al agregar producto al carrito:', error)
      );
    } else if (!this.firebaseUserId) {
      console.error('No se pudo agregar al carrito: Usuario no autenticado.');
    } else {
      console.error('No se pudo agregar al carrito: Producto no encontrado.');
    }
  }

  getFormattedPrice(): string {
    if (this.product?.price != null) {
      const priceNumber = typeof this.product.price === 'number' ? this.product.price : parseFloat(this.product.price);
      if (!isNaN(priceNumber)) {
        return `$${priceNumber.toFixed(2)}`;
      }
    }
    return 'N/A';
  }
}
