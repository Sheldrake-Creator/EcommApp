import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BackendErrorsInterface } from '../../models/Errors/backendErrors.interface';
import { UserRequestInterface } from '../../models/Requests/userRequest.interface';
import { CurrentUserInterface } from '../../models/User/currentUser.interface';

export const userActions = createActionGroup({
  source: 'user',
  events: {
    GetUserProfile: emptyProps(),
    'GetUserProfile success': props<{ currentUser: CurrentUserInterface }>(),
    'GetUserProfile failure': props<{ errors: BackendErrorsInterface }>(),
    //TO DO This might be a fucked way of handling this situation
  },
});
