import { createFeature, createReducer, on } from '@ngrx/store';
import { CartInterface } from '../../models/Cart/cart.interface';
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
      cartItems: [...state.cartItems, action.payload],
    })),
    on(cartActions.removeCartItemSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      cartItems: state.cartItems.filter(
        (item) => item.ItemId !== action.cartItemId,
      ),
    })),
    on(cartActions.updateCartItemSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      cartItems: state.cartItems.map((item) =>
        item.ItemId !== action.payload.id ? action.payload : item,
      ),
    })),
    on(cartActions.getCartSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      cartItems: action.payload.cartItems,
      cart: action.payload,
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
