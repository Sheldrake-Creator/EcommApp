import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CartInterface } from '../../models/Cart/cart.interface';
import { BackendErrorsInterface } from '../../models/Errors/backendErrors.interface';
import { AddItemRequestInterface } from '../../models/Requests/addItemRequest.interface';
import { UpdateCartItemRequestInterface } from '../../models/Requests/updateCartItemRequest.interface';

export const cartActions = createActionGroup({
  source: 'cart',
  events: {
    GetCartRequest: emptyProps(),
    'GetCart Success': props<{ payload: CartInterface }>(),
    'GetCart Failure': props<{ errors: BackendErrorsInterface }>(),
    AddCartItemRequest: props<{ reqData: AddItemRequestInterface }>(),
    'AddCartItem Success': props<{ payload: CartInterface }>(),
    'AddCartItem Failure': props<{ errors: BackendErrorsInterface }>(),
    RemoveCartItemRequest: props<{ reqData: number }>(),
    'RemoveCartItem Success': props<{ payload: CartInterface }>(),
    'RemoveCartItem Failure': props<{ errors: BackendErrorsInterface }>(),
    UpdateCartItemRequest: props<{ reqData: UpdateCartItemRequestInterface }>(),
    'UpdateCartItem Success': props<{ payload: CartInterface }>(),
    'UpdateCartItem Failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
