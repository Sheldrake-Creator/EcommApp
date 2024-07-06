import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressInterface } from '../../models/Address/address.interface';
import { HttpResponseInterface } from '../../models/Responses/httpResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderServices {
  API_URL = 'http://localhost:4545/';

  constructor(private http: HttpClient) {}

  //******* ORDER SERVICES *******//

  addAddress(
    shippingAddress: AddressInterface,
  ): Observable<HttpResponseInterface> {
    return this.http.post<HttpResponseInterface>(
      `${this.API_URL}/api/orders/add`,
      shippingAddress,
    );
  }

  //Might need to adjust this method to take in the cart model as a parameter
  createOrder(): Observable<HttpResponseInterface> {
    return this.http.get<HttpResponseInterface>(
      `${this.API_URL}api/orders/`,
      //  cart: CartInterface cart, //? Might want to add cart to this later
    );
  }

  findOrderById(orderId: number): Observable<HttpResponseInterface> {
    return this.http.get<HttpResponseInterface>(
      `${this.API_URL}/api/orders/${orderId}`,
    );
  }

  getOrderHistory(): Observable<HttpResponseInterface> {
    return this.http.get<HttpResponseInterface>(
      `${this.API_URL}/api/orders/user`,
    );
  }

  //******* ORDER ADMIN SERVICES *******//

  getAllOrders(): Observable<HttpResponseInterface> {
    return this.http.get<HttpResponseInterface>(
      `${this.API_URL}api/admin/orders/`,
    );
  }

  getConfirmedOrders(orderId: number): Observable<HttpResponseInterface> {
    return this.http.get<HttpResponseInterface>(
      `${this.API_URL}/api/admin/orders/${orderId}/confirmed/`,
    );
  }

  getShippingOrders(orderId: number): Observable<HttpResponseInterface> {
    return this.http.get<HttpResponseInterface>(
      `${this.API_URL}/api/admin/orders/${orderId}/shipping/`,
    );
  }

  getDeliveredOrders(orderId: number): Observable<HttpResponseInterface> {
    return this.http.get<HttpResponseInterface>(
      `${this.API_URL}/api/admin/orders/${orderId}/delivered/`,
    );
  }

  cancelOrder(orderId: number): Observable<HttpResponseInterface> {
    return this.http.put<HttpResponseInterface>(
      `${this.API_URL}api/admin/orders/id/${orderId}/cancel`,
      orderId,
    );
  }

  deleteOrder(orderId: number): Observable<HttpResponseInterface> {
    return this.http.delete<HttpResponseInterface>(
      `${this.API_URL}api/admin/orders/id/${orderId}/delete`,
    );
  }
}
