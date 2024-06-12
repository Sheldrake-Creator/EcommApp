import { BackendErrorsInterface } from '../Errors/backendErrors.interface';
import { CurrentUserInterface } from '../User/currentUser.interface';

export interface LogoutRequestInterface {
  user: {
    token: string;
  };
}
