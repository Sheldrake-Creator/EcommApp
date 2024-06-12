import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CurrentUserInterface } from '../../models/User/currentUser.interface';
import { PersistenceService } from '../Auth/auth.persistence.service';
import { userActions } from './user.actions';
import { UserService } from './user.services';

export const getUserEffect = createEffect(
  (action$ = inject(Actions), userService = inject(UserService)) => {
    return action$.pipe(
      ofType(userActions.getUserProfile),
      switchMap(() => {
        return userService.getUserProfileById().pipe(
          tap((currentUser: CurrentUserInterface) => {
            console.log(currentUser), currentUser.email;
          }),
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
