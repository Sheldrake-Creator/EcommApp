import { ProductInterface } from '../Product/product.interface';

export interface OrderItemInterface {
  orderItemId: number;
  orderId: number;
  product: ProductInterface;
  size: string;
  quantity: number;
  orderPrice: number;
  discountedPrice: number;
  deliveryDate: Date;
}
