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
  specifications: string;
  image_url: string; // Este es el campo que viene de la base de datos
  active: boolean; // Añadido para que coincida con el modelo
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://gadgetzone-queries-534526154363.us-central1.run.app/products';

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
          imageUrl: product.image_url, // Mapeo de image_url a imageUrl
          active: product.active // Incluimos active en el mapeo
        }))
      )
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<ApiProduct>(`${this.apiUrl}/${id}`).pipe(
      map((product: ApiProduct) => {
        const mappedProduct: Product = {
          id: product.id,
          name: product.name,
          description: product.description,
          specifications: product.specifications,
          price: product.price,
          stock: product.stock,
          imageUrl: product.image_url,
          active: product.active
        };
        console.log('Producto mapeado:', mappedProduct);
        return mappedProduct;
      })
    );
  }
  
  
  addProduct(product: Product): Observable<Product> {
    // Mapeamos imageUrl a image_url antes de enviar al backend
    const apiProduct = {
      ...product,
      image_url: product.imageUrl, // Cambia imageUrl a image_url
      imageUrl: undefined // Elimina imageUrl para evitar conflictos
    };
    return this.http.post<Product>(this.apiUrl, apiProduct);
  }

  updateProduct(product: Product): Observable<Product> {
    // Mapeamos imageUrl a image_url antes de enviar al backend
    const apiProduct = {
      ...product,
      image_url: product.imageUrl, // Cambia imageUrl a image_url
      imageUrl: undefined // Elimina imageUrl para evitar conflictos
    };
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, apiProduct);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}