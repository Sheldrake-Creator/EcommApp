import { AuthStateInterface } from '../models/Auth/authState.interface';
import { authReducer } from './Auth/auth.reducer';

export interface AppState {
  user: any;
  auth: any;
  product: any;
  cart: any;
  order: any;
}

// export const appReducer = {
//   AuthState: authReducer,
// };
