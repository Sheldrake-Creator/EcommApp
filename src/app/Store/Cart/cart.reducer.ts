import { createFeature, createReducer, on } from '@ngrx/store';
import { CartStateInterface } from '../../models/Cart/cartState.interface';
import { cartActions } from './cart.actions';

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
    on(
      cartActions.createCartRequest,
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
      cartActions.removeCartItemFailure,
      cartActions.addCartItemFailure,
      cartActions.updateCartItemFailure,
      cartActions.createCartFailure,
      (state, action) => ({
        ...state,
        validationErrors: action.errors,
        isLoading: false,
      }),
    ),
    on(cartActions.createCartSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      cartItems: action.payload.cartItems,
      cart: action.payload,
    })),

    on(cartActions.addCartItemSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      cartItems: [...state.cartItems, action.payload],
    })),
    on(cartActions.removeCartItemSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      cartItems: state.cartItems.filter(
        (item) => item.id !== action.cartItemId,
      ),
    })),
    on(cartActions.updateCartItemSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      cartItems: state.cartItems.map((item) =>
        item.id !== action.payload.id ? action.payload : item,
      ),
    })),
  ),
});

export const {
  name: cartFeatureKey,
  reducer: cartReducer,
  selectCartItems,
  selectIsLoading,
  selectValidationErrors,
  selectCart,
} = cartFeature;
