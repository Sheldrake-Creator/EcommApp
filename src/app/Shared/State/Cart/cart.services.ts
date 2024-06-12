import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { AppState } from '../AppState';
import * as selectors from '../selectors';
import { CartInterface } from './Types/cart.interface';
import { CartResponseInterface } from './Types/cartResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  API_URL = 'http://localhost:4545/';

  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
  ) {}

  createCart(): Observable<CartInterface> {
    return this.store.pipe(
      select(selectors.selectCurrentUser),
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

    return this.http.put(this.API_URL + '/updateItem', reqData.data).pipe(
      tap((response) => console.log('Response: ', response)),
      map((response) => response),
    );
  }
}
