import { BackendErrorsInterface } from '../Errors/backendErrors.interface';
import { CartInterface } from './cart.interface';
import { CartItemInterface } from './cartItem.interface';

export interface CartStateInterface {
  cartItems: CartItemInterface[];
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
  cart: CartInterface | null;
}
