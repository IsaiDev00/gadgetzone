export interface CartItem {
  cartId: number;
  userId: number;
  productId: number;
  quantity: number;
  name: string;
  description?: string;
  specifications?: string;
  price: number;
  imageUrl?: string;
  stock: number;
  active: boolean;
}
