export interface Accessorie {
  id: string;
  name: string;
  description: string;
  price: number;
  imageURL: string[];
  isAvailable: boolean;
  totalOrders: number;
  ordersThisMonth: number;
  availableQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}
