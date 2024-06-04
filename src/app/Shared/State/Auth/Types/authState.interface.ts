import { BackendErrorsInterface } from '../../../ErrorHandling/BackendErrors/Types/backendErrors.interface';
import { CurrentUserInterface } from './currentUser.interface';

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | null | undefined;
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
}
