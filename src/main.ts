import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),             // Proveedor para el enrutador
    provideHttpClient(),               // Proveedor para HttpClient
    importProvidersFrom(BrowserModule) // Proveedor para BrowserModule
  ]
}).catch(err => console.error(err));
