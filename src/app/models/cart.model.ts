export interface CartItem {
  cartId: number;
  userId: number;
  productId: number;
  quantity: number;
  name: string;
  description?: string;
  specifications?: string;
  price: number;
  image_url?: string;
  stock: number;
  active: boolean;
}
