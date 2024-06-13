import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthStateInterface } from '../../models/Auth/authState.interface';
import { CartInterface } from '../../models/Cart/cart.interface';
import { CartResponseInterface } from '../../models/Responses/cartResponse.interface';
import { CurrentUserInterface } from '../../models/User/currentUser.interface';
import { AppState } from '../AppState';
import { authFeatureKey, selectCurrentUser } from '../Auth/auth.reducer';
import * as selectors from '../selectors';
import { cartActions } from './cart.actions';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  API_URL = 'http://localhost:4545/';
  currentUser$: Observable<CurrentUserInterface | undefined | null>;

  constructor(
    private store: Store<AuthStateInterface>,
    private http: HttpClient,
  ) {
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  // getCart(): Observable<CartInterface> {
  //   return this.currentUser$.pipe(
  //     switchMap((user) => {
  //       const reqData = { user };
  //       return this.http
  //         .post<CartResponseInterface>(`${this.API_URL}api/getCart`, reqData)
  //         .pipe(map((payload) => payload.cart));
  //     }),
  //   );
  // }

  createCart(): Observable<CartInterface> {
    return this.currentUser$.pipe(
      switchMap((user) => {
        const reqData = { user };
        return this.http
          .post<CartResponseInterface>(`${this.API_URL}api/createCart`, reqData)
          .pipe(map((payload) => payload.cart));
      }),
    );
  }

  // const hi = this.store.select(selectCurrentUserId)
  // return this.http.post(url + "/api/createCart")
  // .pipe(
  //   map((selectCurrentUser)=> selectCurrentUser.)
  // )

  addCartItem(reqData: any) {
    return this.http.put(this.API_URL + '/addItem', reqData).pipe(
      tap((cartItem) => console.log(cartItem)),
      map((response) => response),
    );
  }

  removeCartItem(cartItemId: Number) {
    return this.http
      .delete(this.API_URL + '/removeItem')
      .pipe(map((response) => response));
  }
  updateCartItem(reqData: any) {
    console.log('Request: ', reqData);

    return this.http
      .post<CartResponseInterface>(`${this.API_URL}api/getCart`, reqData)
      .pipe(
        tap((response) => console.log('Response: ', response)),
        map((response) => response),
      );
  }
  getCart() {
    return this.currentUser$.pipe(
      switchMap((currentUser) => {
        const reqData = { user: currentUser };
        return this.http.post(`${this.API_URL}api/getCart`, reqData).pipe(
          map((data: any) => {
            console.log('cart : ', data);
            return cartActions.getCartSuccess({ payload: data });
          }),
          catchError((error: any) => {
            return of(
              cartActions.getCartFailure(
                error.response && error.response.errors
                  ? error.response.errors
                  : error.message,
              ),
            );
          }),
        );
      }),
    );
  }
}
