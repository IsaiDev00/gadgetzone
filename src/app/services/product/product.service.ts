import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../models/product.model';

// Definimos la estructura de la respuesta de la API
interface ApiProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string; // Este es el campo que viene de la base de datos
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://us-central1-gadgetzoneproject-438801.cloudfunctions.net/db-queries/products';

  constructor(private http: HttpClient) {}

  // Obtener productos desde la API y mapear el campo image_url a imageUrl
  getProducts(): Observable<Product[]> {
    return this.http.get<ApiProduct[]>(this.apiUrl).pipe(
      map((products: ApiProduct[]) => 
        products.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          imageUrl: product.image_url // Aquí realizamos el mapeo correcto
        }))
      )
    );
  }
}
