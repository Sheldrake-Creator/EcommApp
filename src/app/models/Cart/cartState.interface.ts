import { BackendErrorsInterface } from '../Errors/backendErrors.interface';

export interface CartStateInterface {
  cartItems: any[];
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
  cart: any;
}
