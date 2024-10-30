export interface Invoice {
    id: bigint;
    orderId: bigint;
    invoiceDate: Date;
    total?: number;
  }
  