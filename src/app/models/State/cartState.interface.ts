import { CartInterface } from '../Cart/cart.interface';
import { CartItemInterface } from '../Cart/cartItem.interface';
import { BackendErrorsInterface } from '../Errors/backendErrors.interface';

export interface CartStateInterface {
  // cartItems: CartItemInterface[];
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
  cart: CartInterface | null;
}
