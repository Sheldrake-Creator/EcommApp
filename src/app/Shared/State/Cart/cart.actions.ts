import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BackendErrorsInterface } from '../../ErrorHandling/BackendErrors/Types/backendErrors.interface';

export const cartActions = createActionGroup({
  source: 'cart',
  events: {
    GetCartRequest: emptyProps(),
    'GetCart Success': props<{ payload: any }>(),
    'GetCart Failure': props<{ errors: BackendErrorsInterface }>(),
  },
});

export const cartItemActions = createActionGroup({
  source: 'cartItem',
  events: {
    AddCartItemRequest: props<{ reqData: any }>(),
    'AddCartItem Success': props<{ payload: any }>(),
    'AddCartItem Failure': props<{ errors: BackendErrorsInterface }>(),
    RemoveCartItemRequest: props<{ reqData: any }>(),
    'RemoveCartItem Success': props<{ cartItemId: Number }>(),
    'RemoveCartItem Failure': props<{ errors: BackendErrorsInterface }>(),
    UpdateCartItemRequest: props<{ reqData: any }>(),
    'UpdateCartItem Success': props<{ payload: any }>(),
    'UpdateCartItem Failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
