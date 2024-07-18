import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment.development';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddressInterface } from '../../models/Address/address.interface';
import { HttpResponseInterface } from '../../models/Responses/httpResponse.interface';
import { AddressStateInterface } from '../../models/State/addressState.interface';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  API_URL = environment.API_URL;

  constructor(
    private store: Store<AddressStateInterface>,
    private http: HttpClient,
  ) {}

  addAddress(address: AddressInterface): Observable<HttpResponseInterface> {
    return this.http.post<HttpResponseInterface>(
      `${this.API_URL}/api/address/add`,
      address,
    );
  }
  updateAddress(address: AddressInterface): Observable<HttpResponseInterface> {
    return this.http.put<HttpResponseInterface>(
      `${this.API_URL}/api/address/update`,
      address,
    );
  }
  deleteAddress(addressId: number): Observable<HttpResponseInterface> {
    return this.http.delete<HttpResponseInterface>(
      `${this.API_URL}/api/address/delete/${addressId}`,
    );
  }
}
