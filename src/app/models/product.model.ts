export interface Product {
  id: number; // Cambia bigint a number (veremos esto a continuación)
  name: string;
  description?: string;
  specifications?: string;
  price: number;
  imageUrl?: string;
  stock: number;
  active: boolean;
}
