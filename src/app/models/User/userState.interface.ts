import { BackendErrorsInterface } from '../Errors/backendErrors.interface';
import { CurrentUserInterface } from './currentUser.interface';

export interface UserStateInterface {
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | null | undefined;
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
}
