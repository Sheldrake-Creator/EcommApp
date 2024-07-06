import { BackendErrorsInterface } from '../Errors/backendErrors.interface';
import { CurrentUserInterface } from '../User/currentUser.interface';

export interface OrderStateInterface {
  orders: CurrentUserInterface[];
  order: CurrentUserInterface | undefined;
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
}
