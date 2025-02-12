import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BackendErrorsInterface } from '../../models/Errors/backendErrors.interface';
import { LoginRequestInterface } from '../../models/Requests/loginRequest.interface';
import { RegisterRequestInterface } from '../../models/Requests/registerRequest.interface';
import { CurrentUserInterface } from '../../models/User/currentUser.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register success': props<{ payload: CurrentUserInterface }>(),
    'Register failure': props<{ errors: BackendErrorsInterface }>(),
    Login: props<{ request: LoginRequestInterface }>(),
    'Login success': props<{ payload: CurrentUserInterface }>(),
    'Login failure': props<{ errors: BackendErrorsInterface }>(),
    Logout: emptyProps(),
    'Logout success': props<{ payload: string }>(),
    'Logout failure': emptyProps(),
  },
});
