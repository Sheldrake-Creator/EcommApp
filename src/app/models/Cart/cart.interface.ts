import { CurrentUserInterface } from '../User/currentUser.interface';
import { CartItemInterface } from './cartItem.interface';

export interface CartInterface {
  userId?: number;
  cartId?: number;
  cartItems: CartItemInterface[];
  totalPrice?: number;
  totalItems?: number;
  totalDiscountedPrice?: number;
}
