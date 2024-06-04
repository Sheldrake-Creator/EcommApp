import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { CartStateInterface } from "./Types/cartstate.interface";
import { cartActions, cartItemActions } from "./cart.actions";


const initialState: CartStateInterface = {
    cartItems: [],
    isLoading: false,
    validationErrors: null,
    cart: null
}

export const cartReducer = createReducer(
    initialState,

    on(cartActions.getCartRequest,
        cartItemActions.addCartItemRequest,
        cartItemActions.removeCartItemRequest,
        cartItemActions.updateCartItemRequest, (state) => ({
            ...state,
            isLoading:true,
            validationErrors:null,
    })),
    on(cartActions.getCartFailure,
        cartItemActions.removeCartItemFailure,
        cartItemActions.addCartItemFailure,
        cartItemActions.updateCartItemFailure, (state, actions) => ({
            ...state,
            validationErrors:actions.errors,
            isLoading: false,
    })),
    on(cartActions.getCartSuccess, (state, action) => ({
            ...state,
            isLoading:false,
            cartItems: action.payload.cartItems,
            cart: action.payload,
    })),
    on(cartItemActions.addCartItemSuccess, (state, action) => ({
            ...state,
            isLoading:false,
            cartItems:[...state.cartItems, action.payload],
    })),
    on(cartItemActions.removeCartItemSuccess, (state, action) => ({
            ...state,
            isLoading:false,
            cartItems:state.cartItems.filter((item) => item.id !== action.cartItemId)
    })),
    on(cartItemActions.updateCartItemSuccess, 
        (state, action) => ({
            ...state,
            isLoading:false,
            cartItems:state.cartItems.map((item) => item.id !== action.payload.id ? action.payload: item),

    })),
)



