import { BackendErrorsInterface } from '../Errors/backendErrors.interface';
import { CurrentUserInterface } from '../User/currentUser.interface';

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | null | undefined;
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
}
