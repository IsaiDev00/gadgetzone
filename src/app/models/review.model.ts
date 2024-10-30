export interface Review {
    id: bigint;
    productId: bigint;
    userId: bigint;
    rating: number;  // El valor debe estar entre 1 y 5
    comment?: string;
  }
  