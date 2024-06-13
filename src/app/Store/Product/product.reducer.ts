import {createReducer, on } from "@ngrx/store"
import { findProductByIdSuccess, findProductByCategoryFailure, findProductByCategorySuccess, findProductByIdFailure} from "./product.action"

const initialState={
products: [],
loading: false,
error: null,
product: null
}

export const productReducer=createReducer(
    initialState,
    on(findProductByCategorySuccess,(state,{payload})=>({
        ...state,
        products: payload,
        content: payload.content,
        loading: false
    })),
    on(findProductByIdSuccess,(state,{payload}) =>({
        ...state,
        product: payload,
        loading: true
    })),
    on(findProductByCategoryFailure,findProductByIdFailure,(state,{error})=>({
        ...state,
        error:error,
        loading: false
    })),
)
