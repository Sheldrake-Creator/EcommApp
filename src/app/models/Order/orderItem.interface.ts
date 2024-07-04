export interface OrderItemInterface {
  orderItemId: number;
  orderId: number;
  productId: number;
  size: string;
  quantity: number;
  orderPrice: number;
  discountedPrice: number;
  deliveryDate: Date;
}
