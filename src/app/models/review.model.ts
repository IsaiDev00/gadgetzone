export interface Review {
    id: bigint;
    productId: bigint;
    userId: bigint;
    rating: number;
    comment?: string;
  }
  