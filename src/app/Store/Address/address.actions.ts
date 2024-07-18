import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { AddressInterface } from '../../models/Address/address.interface';
import { BackendErrorsInterface } from '../../models/Errors/backendErrors.interface';
import { SuccessMessageInterface } from '../../models/Responses/successMessage.interface';

export const addressActions = createActionGroup({
  source: 'address',
  events: {
    AddAddressRequest: props<{ reqData: AddressInterface }>(),
    'AddAddress Success': props<{ payload: AddressInterface }>(),
    'AddAddress Failure': props<{ errors: BackendErrorsInterface }>(),
    RemoveAddressRequest: props<{ reqData: number }>(),
    'RemoveAddress Success': props<{ payload: AddressInterface }>(),
    'RemoveAddress Failure': props<{ errors: BackendErrorsInterface }>(),
    UpdateAddressRequest: props<{ reqData: AddressInterface }>(),
    'UpdateAddress Success': props<{ payload: AddressInterface }>(),
    'UpdateAddress Failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
