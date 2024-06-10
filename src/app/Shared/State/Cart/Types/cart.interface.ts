import { CurrentUserInterface } from '../../Auth/Types/currentUser.interface';
import { CartItemInterface } from './cartItem.interface';

export interface CartInterface {
  user: CurrentUserInterface;
  cartId?: string;
  cartItems: CartItemInterface[];
  totalPrice?: number;
  totalItems?: number;
  totalDiscount?: number;
}
