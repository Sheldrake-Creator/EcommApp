import { BackendErrorsInterface } from '../Errors/backendErrors.interface';
import { CurrentUserInterface } from '../User/currentUser.interface';

export interface OrderStateInterface {
  isSubmitting: boolean;
  order: CurrentUserInterface | null | undefined;
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
}
