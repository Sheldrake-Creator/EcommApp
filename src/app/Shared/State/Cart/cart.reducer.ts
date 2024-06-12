import { createFeature, createReducer, on } from '@ngrx/store';
import { CartStateInterface } from './Types/cartstate.interface';
import { cartActions, cartItemActions } from './cart.actions';

const initialState: CartStateInterface = {
  cartItems: [],
  isLoading: false,
  validationErrors: null,
  cart: null,
};

export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialState,
    on(cartActions.createCartRequest, (state) => ({
      ...state,
      isLoading: true,
      validationErrors: null,
    })),
    on(cartActions.createCartFailure, (state, action) => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    })),
    on(cartActions.createCartSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      cartItems: action.payload.cartItems,
      cart: action.payload,
    })),
  ),
});

export const {
  name: cartFeatureKey,
  reducer: cartReduer,
  selectCartItems,
  selectIsLoading,
  selectValidationErrors,
  selectCart,
} = cartFeature;

export const cartItemFeature = createFeature({
  name: 'cartItem',
  reducer: createReducer(
    initialState,
    on(
      cartItemActions.addCartItemRequest,
      cartItemActions.removeCartItemRequest,
      cartItemActions.updateCartItemRequest,
      (state) => ({
        ...state,
        isLoading: true,
        validationErrors: null,
      }),
    ),
    on(
      cartItemActions.removeCartItemFailure,
      cartItemActions.addCartItemFailure,
      cartItemActions.updateCartItemFailure,
      (state, action) => ({
        ...state,
        validationErrors: action.errors,
        isLoading: false,
      }),
    ),
    on(cartItemActions.addCartItemSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      cartItems: [...state.cartItems, action.payload],
    })),
    on(cartItemActions.removeCartItemSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      cartItems: state.cartItems.filter(
        (item) => item.id !== action.cartItemId,
      ),
    })),
    on(cartItemActions.updateCartItemSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      cartItems: state.cartItems.map((item) =>
        item.id !== action.payload.id ? action.payload : item,
      ),
    })),
  ),
});

// export const {
//   name: cartItemFeatureKey,
//   reducer: cartItemReducer,
// selectIsSubmitting,
// selectCurrentUser,
// selectIsLoading,
// selectValidationErrors,
// } = cartItemFeature;
