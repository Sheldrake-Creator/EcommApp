import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpResponseInterface } from '../../models/Responses/httpResponse.interface';
import { SuccessMessageInterface } from '../../models/Responses/successMessage.interface';

import { AddressInterface } from '../../models/Address/address.interface';
import { addressActions } from './address.actions';
import { AddressService } from './address.services';

export const addAddressEffect = createEffect(
  (actions$ = inject(Actions), addressService = inject(AddressService)) => {
    return actions$.pipe(
      ofType(addressActions.addAddressRequest),
      switchMap(({ reqData }) => {
        return addressService.addAddress(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['address'] as AddressInterface;
          }),
          map((payload: AddressInterface) => {
            return addressActions.addAddressSuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              addressActions.addAddressFailure({
                errors: errorResponse.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const updateAddressEffect = createEffect(
  (actions$ = inject(Actions), addressService = inject(AddressService)) => {
    return actions$.pipe(
      ofType(addressActions.updateAddressRequest),
      switchMap(({ reqData }) => {
        return addressService.updateAddress(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['address'];
          }),
          map((payload: AddressInterface) => {
            return addressActions.updateAddressSuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              addressActions.updateAddressFailure({
                errors: errorResponse.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const deleteAddressEffect = createEffect(
  (actions$ = inject(Actions), addressService = inject(AddressService)) => {
    return actions$.pipe(
      ofType(addressActions.removeAddressRequest),
      switchMap(({ reqData }) => {
        return addressService.deleteAddress(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['address'] as AddressInterface;
          }),
          map((payload: AddressInterface) => {
            return addressActions.removeAddressSuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              addressActions.removeAddressFailure({
                errors: errorResponse.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);
