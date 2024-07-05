import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CartInterface } from '../../models/Cart/cart.interface';
import { HttpResponseInterface } from '../../models/Responses/httpResponse.interface';
import { cartActions } from './cart.actions';
import { CartService } from './cart.services';

export const getCartEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions.getCartRequest),
      switchMap(() => {
        return cartService.getCart().pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['cart'] as CartInterface;
          }),
          map((payload: CartInterface) => {
            return cartActions.getCartSuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              cartActions.getCartFailure({
                errors: errorResponse.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const addCartItemEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions.addCartItemRequest),
      switchMap(({ reqData }) => {
        return cartService.addItemToCart(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['cart'] as CartInterface;
          }),
          map((payload: CartInterface) => {
            return cartActions.addCartItemSuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              cartActions.addCartItemFailure({
                errors: errorResponse.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const removeCartItemEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions.removeCartItemRequest),
      switchMap(({ reqData }) => {
        return cartService.removeCartItem(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['cartItem'];
          }),
          map((payload) => {
            return cartActions.removeCartItemSuccess(payload);
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              cartActions.getCartFailure({
                errors: errorResponse.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const updateCartItemEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions.updateCartItemRequest),
      switchMap(({ reqData }) => {
        return cartService.updateCartItem(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['cart'] as CartInterface;
          }),
          map((payload) => {
            return cartActions.updateCartItemSuccess({ payload });
          }),
          catchError((errrorResponse: HttpResponseInterface) => {
            return of(
              cartActions.addCartItemFailure({
                errors: errrorResponse.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);
