import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'redux';
import { catchError, map, of, tap } from 'rxjs';
import { CartItemRequestInterface } from './Types/cartItemRequest.interface';
import { cartActions, cartItemActions } from './cart.actions';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  API_URL = 'http://localhost:4545/api';

  constructor(
    private store: Store,
    private http: HttpClient,
  ) {}

  getCart() {
    const url = this.API_URL + '/cart/';
    return this.http
      .get(url)
      .pipe(
        map((data: any) => {
          console.log('cart : ', data);
          return cartActions.getCartSuccess({ payload: data });
        }),
        catchError((error: any) => {
          return of(
            cartActions.getCartFailure(
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
            ),
          );
        }),
      )
      .subscribe((action) => this.store.dispatch(action));
  }
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
    console.log('Requset: ', reqData);

    return this.http.put(this.API_URL + '/updateItem', reqData.data).pipe(
      tap((response) => console.log('Response: ', response)),
      map((response) => response),
    );
  }
}
