import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'redux';
import { catchError, map, of } from 'rxjs';
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
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + 'jwt',
      'Content-Type': 'application/json',
    });
    return this.http
      .get(url, { headers })
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
    const headers = new HttpHeaders({
      Authorization: `Bearer ${'jwt'}`,
      'Content-Type': 'application/json',
    });
    this.http
      .put(this.API_URL + '/addItem', reqData, { headers })
      .pipe(map((response) => response));
  }

  removeCartItem(cartItemId: Number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${'jwt'}`,
      'Content- Type': 'application/json',
    });
    return this.http
      .delete(this.API_URL + '/removeItem', { headers })
      .pipe(map((response) => response));
  }
  updateCartItem() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${'jwt'}`,
      'Content- Type': 'application/json',
    });
    return this.http
      .put(this.API_URL + '/updateItem', { headers })
      .pipe(map((response) => response));
  }
}
