import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CartInterface } from '../../models/Cart/cart.interface';
import { BackendErrorsInterface } from '../../models/Errors/backendErrors.interface';

export const cartActions = createActionGroup({
  source: 'cart',
  events: {
    GetCartRequest: emptyProps(),
    'GetCart Success': props<{ payload: any }>(),
    'GetCart Failure': props<{ errors: BackendErrorsInterface }>(),
    CreateCartRequest: props<{ reqData: CartInterface }>(),
    'CreateCart Success': props<{ payload: any }>(),
    'CreateCart Failure': props<{ errors: BackendErrorsInterface }>(),
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
