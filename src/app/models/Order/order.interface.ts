import { AddressInterface } from '../Address/address.interface';
import { OrderItemInterface } from './orderItem.interface';

export interface OrderInterface {
  orderId: number;
  orderItems: OrderItemInterface[];
  shippingAddress: AddressInterface;
  totalPrice: number;
  totalDiscountedPrice: number;
  discountPresent: number;
  orderStatus: string;
  color: string;
  deliveryDate: Date;
  orderDate: Date;
  userId: number;
}
