import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { AddItemRequestInterface } from '../../models/Requests/addItemRequest.interface';
import { UpdateCartItemRequestInterface } from '../../models/Requests/updateCartItemRequest.interface';
import { HttpResponseInterface } from '../../models/Responses/httpResponse.interface';
import { CartStateInterface } from '../../models/State/cartState.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  API_URL = 'http://localhost:4545/';

  constructor(
    private store: Store<CartStateInterface>,
    private http: HttpClient,
  ) {}

  //******* CART SERVICES *******//

  getCart(): Observable<HttpResponseInterface> {
    return this.http
      .get<HttpResponseInterface>(`${this.API_URL}api/getCart`)
      .pipe(tap((response: any) => console.log(response)));
  }

  //*******  CART ITEM SERVICES *******//
  addItemToCart(
    reqData: AddItemRequestInterface,
  ): Observable<HttpResponseInterface> {
    return this.http
      .put<HttpResponseInterface>(this.API_URL + 'api/item/add', reqData)
      .pipe(tap((response) => console.log(response.data)));
  }

  removeCartItem(cartItemId: Number): Observable<HttpResponseInterface> {
    return this.http
      .delete<HttpResponseInterface>(`${this.API_URL}api/item/${cartItemId}`)
      .pipe(tap((response) => console.log(response.data)));
  }

  updateCartItem(
    req: UpdateCartItemRequestInterface,
  ): Observable<HttpResponseInterface> {
    console.log('Request: ', req);
    return this.http
      .put<HttpResponseInterface>(
        `${this.API_URL}api/item/${req.cartItemId}`,
        req,
      )
      .pipe(tap((response) => console.log(response.data)));
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
