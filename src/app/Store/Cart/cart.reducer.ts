import { createFeature, createReducer, on } from '@ngrx/store';
import { CartStateInterface } from '../../models/State/cartState.interface';
import { cartActions } from './cart.actions';

const initialState: CartStateInterface = {
  isLoading: false,
  validationErrors: null,
  cart: undefined,
};

export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialState,
    on(
      cartActions.getCartRequest,
      cartActions.addCartItemRequest,
      cartActions.removeCartItemRequest,
      cartActions.updateCartItemRequest,
      (state) => ({
        ...state,
        isLoading: true,
        validationErrors: null,
      }),
    ),
    on(
      cartActions.getCartFailure,
      cartActions.removeCartItemFailure,
      cartActions.addCartItemFailure,
      cartActions.updateCartItemFailure,
      (state, action) => ({
        ...state,
        validationErrors: action.errors,
        isLoading: false,
      }),
    ),
    on(cartActions.addCartItemSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      // cartItems: action.payload.cartItems, // Update cartItems with the new array from the payload
      cart: action.payload, // Replace the entire cart with the new cart entity from the payload
    })),
    on(cartActions.removeCartItemSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      cart: action.payload,
      // cartItems: state.cartItems?.filter(
      //   (item) => item.cartItemId !== action.payload.cartItemId,
      // ),
    })),
    on(cartActions.updateCartItemSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      // cartItems: state.cartItems.map((item) =>
      //   item.cartItemId !== action.payload.cartItemId ? action.payload : item,
      // ),
      cart: action.payload,
    })),
    on(cartActions.getCartSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      // cartItems: action.payload.cartItems,
      cart: action.payload,
    })),
  ),
});

export const {
  name: cartFeatureKey,
  reducer: cartReducer,
  selectIsLoading,
  selectValidationErrors,
  selectCart,
} = cartFeature;
