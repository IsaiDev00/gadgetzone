export interface Order {
    id: bigint;
    userId: bigint;
    orderDate: Date;
    status: 'pending' | 'completed' | 'canceled';
    total?: number;
  }
  