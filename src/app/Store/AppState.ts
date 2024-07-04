import { AuthStateInterface } from '../models/State/authState.interface';
import { CartStateInterface } from '../models/State/cartState.interface';
import { ProductStateInterface } from '../models/State/productState.interface';
import { authReducer } from './Auth/auth.reducer';

export interface AppState {
  user: any;
  auth: AuthStateInterface;
  product: ProductStateInterface;
  cart: CartStateInterface;
  order: any;
}

// export const appReducer = {
//   AuthState: authReducer,
// };
