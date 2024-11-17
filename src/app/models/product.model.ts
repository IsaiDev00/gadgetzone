export interface Product {
  id: number;
  name: string;
  description?: string;
  specifications?: string;
  price: number;
  imageUrl?: string;
  stock: number;
  active: boolean;
}
