import { createAction, props } from "@ngrx/store";

export const findProductByCategoryRequest=createAction(
    `[Product] Find products By Category Request`
)

export const findProductByCategorySuccess=createAction(
    `[Product] Find products By Category success`,
    props<{payload:any}>()
)

export const findProductByCategoryFailure=createAction(
    `[Product] Find products By Category failure`,
    props<{error:any}>()
)

export const findProductByIdRequest=createAction(
    `[Product] Find products By Category Request`
)

export const findProductByIdSuccess=createAction(
    `[Product] Find products By Category success`,
    props<{payload:any}>()
)

export const findProductByIdFailure=createAction(
    `[Product] Find products By Id failure`,
    props<{error:any}>()
)