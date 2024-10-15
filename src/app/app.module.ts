import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { ProductManagementComponent } from './components/product-management/product-management.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ProductManagementComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {}