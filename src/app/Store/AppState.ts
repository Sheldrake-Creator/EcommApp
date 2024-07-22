import { AddressStateInterface } from '../models/State/addressState.interface';
import { AuthStateInterface } from '../models/State/authState.interface';
import { CartStateInterface } from '../models/State/cartState.interface';
import { OrderStateInterface } from '../models/State/orderState.interface';
import { ProductStateInterface } from '../models/State/productState.interface';
import { UserStateInterface } from '../models/User/userState.interface';

export interface AppState {
  user: UserStateInterface;
  auth: AuthStateInterface;
  product: ProductStateInterface;
  cart: CartStateInterface;
  order: OrderStateInterface;
  address: AddressStateInterface;
}

// export const appReducer = {
//   AuthState: authReducer,
// };
