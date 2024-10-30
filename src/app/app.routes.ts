import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { AccountComponent } from './components/account/account.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AdminProductComponent } from './components/admin-product/admin-product.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';

export const routes: Routes = [
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  { path: 'productos', component: ProductListComponent },
  { path: 'carrito', component: CartComponent },
  { path: 'cuenta', component: AccountComponent },
  { path: 'producto/:id', component: ProductDetailComponent },
  { path: 'adminProducto', component: AdminProductComponent },
  { path: 'thank-you', component: ThankYouComponent }
];