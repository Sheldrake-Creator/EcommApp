import { BackendErrorsInterface } from '../Errors/backendErrors.interface';
import { CurrentUserInterface } from './currentUser.interface';

export interface UserStateInterface {
  [x: string]: any;
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | null | undefined;
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
}
