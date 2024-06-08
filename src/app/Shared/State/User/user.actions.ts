import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BackendErrorsInterface } from '../../ErrorHandling/BackendErrors/Types/backendErrors.interface';
import { CurrentUserInterface } from '../Auth/Types/currentUser.interface';
import { UserRequestInterface } from './Types/userRequest.interface';

export const userActions = createActionGroup({
  source: 'user',
  events: {
    GetUserProfile: emptyProps(),
    'GetUserProfile success': props<{ currentUser: CurrentUserInterface }>(),
    'GetUserProfile failure': props<{ errors: BackendErrorsInterface }>(),
    //TO DO This might be a fucked way of handling this situation
  },
});
