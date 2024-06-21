import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CartItemComponent } from '../../Components/cart-item/cart-item.component';
import { CartInterface } from '../../models/Cart/cart.interface';
import { CartItemInterface } from '../../models/Cart/cartItem.interface';
import { BackendErrorsInterface } from '../../models/Errors/backendErrors.interface';

export const cartActions = createActionGroup({
  source: 'cart',
  events: {
    GetCartRequest: emptyProps(),
    'GetCart Success': props<{ payload: CartInterface }>(),
    'GetCart Failure': props<{ errors: BackendErrorsInterface }>(),
    AddCartItemRequest: props<{ reqData: any }>(),
    'AddCartItem Success': props<{ payload: CartItemInterface }>(),
    'AddCartItem Failure': props<{ errors: BackendErrorsInterface }>(),
    RemoveCartItemRequest: props<{ reqData: any }>(),
    'RemoveCartItem Success': props<{ cartItemId: Number }>(),
    'RemoveCartItem Failure': props<{ errors: BackendErrorsInterface }>(),
    UpdateCartItemRequest: props<{ reqData: CartItemInterface }>(),
    'UpdateCartItem Success': props<{ payload: any }>(),
    'UpdateCartItem Failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
