import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { CartInterface } from '../../models/Cart/cart.interface';
import { CartItemInterface } from '../../models/Cart/cartItem.interface';
import { AddItemRequestInterface } from '../../models/Requests/addItemRequest.interface';
import { HttpResponseInterface } from '../../models/Responses/httpResponse.interface';
import { authActions } from '../Auth/auth.actions';
import { cartActions } from './cart.actions';
import { CartService } from './cart.services';

export const getCartEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions.addCartItemRequest),
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
);

export const addCartItemEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions.addCartItemRequest),
      switchMap((reqData) => {
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
);

export const updateCartItemEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions.updateCartItemRequest),
      switchMap(({ reqData }) => {
        return cartService.updateCartItem(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['cartItem'] as CartItemInterface;
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
);
