import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart/cart.service';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading: boolean = true;
  firebaseUserId: string | null = null;
  errorMessage: string | null = null;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getFirebaseUserId().subscribe((id) => {
      if (id) {
        this.firebaseUserId = id;
        console.log('firebaseUserId obtenido:', id);
      } else {
        console.error('Usuario no autenticado');
      }
    });

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
    if (!this.product) {
      console.error('No se pudo agregar al carrito: Producto no encontrado.');
      alert('Producto no encontrado. Inténtalo nuevamente.');
      return;
    }
  
    if (!this.firebaseUserId) {
      console.error('No se pudo agregar al carrito: Usuario no autenticado.');
      alert('Debes iniciar sesión para agregar productos al carrito.');
      return;
    }
  
    if (!this.quantity || this.quantity < 1 || this.quantity > this.product.stock) {
      this.errorMessage = 'Por favor, selecciona una cantidad válida.';
      return;
    }
  
    this.cartService.addToCart(this.product.id, this.firebaseUserId, this.quantity).subscribe(
      () => {
        console.log(`Producto agregado al carrito: ${this.product?.name || 'Producto desconocido'}, Cantidad: ${this.quantity}`);
        alert('Producto agregado al carrito.');
        this.errorMessage = null;
      },
      (error) => {
        console.error('Error al agregar producto al carrito:', error);
        alert('Ocurrió un error al agregar el producto al carrito. Inténtalo nuevamente.');
      }
    );
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
