export interface Product {
  id: number;
  name: string;
  description: string;
  specifications: string;
  price: number;
  image_url?: string;
  stock: number;
  active: boolean;
}