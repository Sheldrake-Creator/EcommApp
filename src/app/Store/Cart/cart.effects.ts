import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { authActions } from '../Auth/auth.actions';
import { cartActions } from './cart.actions';
import { CartService } from './cart.services';

export const createCartAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      switchMap(() => {
        return cartService.createCart().pipe(
          tap((user) => console.log(user)),
          map((payload: any) => {
            return cartActions.createCartSuccess({ payload });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              cartActions.createCartFailure({
                errors: errorResponse.error.errors,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);
