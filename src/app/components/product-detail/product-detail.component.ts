import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

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
          this.product = product;
        },
        (error: any) => {
          console.error('Error al cargar el producto:', error);
        }
      );
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      console.log('Producto agregado al carrito:', this.product);
    }
  }
}
