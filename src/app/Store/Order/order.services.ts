import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AddressInterface } from '../../models/Address/address.interface';
import { OrderInterface } from '../../models/Order/order.interface';
import { CreateOrderRequest } from '../../models/Requests/createOrderRequest.interface';
import { HttpResponseInterface } from '../../models/Responses/httpResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  //******* ORDER SERVICES *******//

  //Might need to adjust this method to take in the cart model as a parameter
  createOrder(req: CreateOrderRequest): Observable<HttpResponseInterface> {
    console.log('Req: ', req);
    return this.http.post<HttpResponseInterface>(
      `${this.API_URL}/api/orders/`,
      req,
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
      `${this.API_URL}/api/admin/orders/`,
    );
  }

  confirmOrder(orderId: number): Observable<HttpResponseInterface> {
    return this.http.post<HttpResponseInterface>(
      `${this.API_URL}/api/admin/orders/confirmed/`,
      orderId,
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
      `${this.API_URL}/api/admin/orders/id/${orderId}/cancel`,
      orderId,
    );
  }

  deleteOrder(orderId: number): Observable<HttpResponseInterface> {
    return this.http.delete<HttpResponseInterface>(
      `${this.API_URL}/api/admin/orders/id/${orderId}/delete`,
    );
  }
}
