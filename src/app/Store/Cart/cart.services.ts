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

  //******* CART SERVICES *******//

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

  getCart() {
    return this.http.get(`${this.API_URL}api/getCart`).pipe(
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
  }

  //*******  CART ITEM SERVICES *******//
  addItemToCart(reqData: any) {
    return this.http.put(this.API_URL + 'api/item/add', reqData).pipe(
      tap((cartItem) => console.log(cartItem)),
      map((response) => response),
    );
  }

  removeCartItem(cartItemId: Number) {
    return this.http
      .delete(`${this.API_URL}api/item/${cartItemId}`)
      .pipe(map((response) => response));
  }

  updateCartItem(cartItem: any) {
    console.log('Request: ', cartItem);
    return this.http
      .post<CartResponseInterface>(
        `${this.API_URL}api/item/${cartItem.cartItemId}`,
        cartItem.cartItemId,
      )
      .pipe(
        tap((response) => console.log('Response: ', response)),
        map((response) => response),
      );
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

  // const hi = this.store.select(selectCurrentUserId)
  // return this.http.post(url + "/api/createCart")
  // .pipe(
  //   map((selectCurrentUser)=> selectCurrentUser.)
  // )

  //   addItemToCart(reqData: any) {
  //     const url = `${this.API_BASE_URL}/api/cart/add`;
  //     const headers = new HttpHeaders({
  //         Authorization: `Bearer ${"jwt"}`,
  //         'Content-Type': 'application/json',
  //     });

  //     return this.http
  //         .put(url, reqData, { headers })
  //         .pipe(
  //             map((data: any) => {
  //                 console.log("added item",data);

  //                 return addCartItemSuccess({ payload: data });
  //             }),
  //             catchError((error: any) => {
  //                 return of(addCartItemFailure(error.response && error.response.data.message
  //                     ? error.response.data.message
  //                     : error.message))
  //             })
  //         ).subscribe((action) => this.store.dispatch(action));
  // }

  // removeCartItem(cartItemId:Number) {
  //     const url = `${this.API_BASE_URL}/api/cart_items/${cartItemId}`;
  //     const headers = new HttpHeaders({
  //         Authorization: `Bearer ${"jwt"}`,
  //         'Content- Type': 'application/json',
  //     });

  //     return this.http.delete(url,{ headers }).pipe(
  //         map((data: any)=> {
  //             console.log("removed item data")
  //             return removeCartItemSuccess({cartItemId})}),
  //         catchError ((error: any) =>{
  //             return of(removeCartItemFailure(error.response && error.response.data.message
  //             ? error.response.data.message
  //             : error.message))
  //         })
  //     ).subscribe((action) => this.store.dispatch(action));
  // }

  // updateCartItem(reqData:any) {
  //     console.log("req data ", reqData);

  //     const url = `${this.API_BASE_URL}/api/cart_items/${reqData.cartItemId}`;
  //     const headers = new HttpHeaders({
  //         Authorization: `Bearer ${"jwt"}`,
  //         'Content- Type': 'application/json',
  //     });

  //     return this.http.put(url, reqData.data,{ headers }).pipe(
  //         map((data: any)=> {
  //             console.log("updated item data", data)
  //             return updateCartItemSuccess({payload:data})}),
  //         catchError ((error: any) =>{
  //             return of(updateCartItemFailure(error.response && error.response.data.message
  //             ? error.response.data.message
  //             : error.message))
  //         })
  //     ).subscribe((action) => this.store.dispatch(action));
}
