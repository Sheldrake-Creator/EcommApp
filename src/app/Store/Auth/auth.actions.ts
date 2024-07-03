import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { BackendErrorsInterface } from '../../models/Errors/backendErrors.interface';
import { LoginRequestInterface } from '../../models/Requests/loginRequest.interface';
import { LogoutRequestInterface } from '../../models/Requests/logoutRequest.interface';
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
  },
});

export const logout = createAction('[auth] Logout User');
