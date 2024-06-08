import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { PersistenceService } from '../Auth/Store/auth.persistence.service';
import { CurrentUserInterface } from '../Auth/Types/currentUser.interface';
import { userActions } from './user.actions';
import { UserService } from './user.services';

export const getUserEffect = createEffect(
  (action$ = inject(Actions), userService = inject(UserService)) => {
    return action$.pipe(
      ofType(userActions.getUserProfile),
      switchMap(() => {
        return userService.getUserProfileById().pipe(
          map((currentUser: CurrentUserInterface) => {
            return userActions.getUserProfileSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              userActions.getUserProfileFailure({
                errors: errorResponse.error.errors,
              }),
            );
          }),
        );
      }),
    );
  },
);
