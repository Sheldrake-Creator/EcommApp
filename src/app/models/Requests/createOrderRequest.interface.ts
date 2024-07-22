import { AddressInterface } from '../Address/address.interface';
import { CartInterface } from '../Cart/cart.interface';

export interface CreateOrderRequest {
  address: AddressInterface;
  cart: CartInterface;
}
