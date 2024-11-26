import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { TermsComponent } from './components/terms/terms.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminGuard } from './guards/admin.guard';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';

export const routes: Routes = [
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  { path: 'productos', component: ProductListComponent },
  { path: 'carrito', component: CartComponent },
  { path: 'producto/:id', component: ProductDetailComponent },
  { path: 'product-management', component: ProductManagementComponent, canActivate: [AdminGuard] },
  { path: 'thank-you', component: ThankYouComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'profile-edit', component: ProfileEditComponent },
  { path: 'register-admin', component: RegisterAdminComponent}
];