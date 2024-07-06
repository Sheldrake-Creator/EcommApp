import { BackendErrorsInterface } from '../Errors/backendErrors.interface';
import { OrderInterface } from '../Order/order.interface';
import { CurrentUserInterface } from '../User/currentUser.interface';

export interface OrderStateInterface {
  orders: OrderInterface[];
  order: OrderInterface | undefined;
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
}
