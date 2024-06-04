import { authReducer } from './Auth/Store/auth.reducer';
import { AuthStateInterface } from './Auth/Types/authState.interface';

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
