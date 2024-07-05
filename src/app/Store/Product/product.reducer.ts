import { createReducer, on } from '@ngrx/store';
import { ProductStateInterface } from '../../models/State/productState.interface';
import { productActions, productAdminActions } from './product.action';

const initialState: ProductStateInterface = {
  products: [],
  isLoading: false,
  validationErrors: null,
  product: undefined,
};

export const productReducer = createReducer(
  initialState,
  on(
    productActions.findProductsByIdRequest,
    productActions.findProductByCategoryRequest,
    productAdminActions.createProductRequest,
    productAdminActions.createMultipleProductsRequest,
    productAdminActions.deleteProductRequest,
    productAdminActions.updateProductRequest,
    (state) => ({
      ...state,
      isLoading: true,
      validationErrors: null,
    }),
  ),
  on(
    productActions.findProductsByIdFailure,
    productActions.findProductByCategoryFailure,
    productAdminActions.createProductFailure,
    productAdminActions.createMultipleProductsFailure,
    productAdminActions.deleteProductFailure,
    productAdminActions.updateProductFailure,
    (state, action) => ({
      ...state,
      isLoading: false,
      validationErrors: action.errors,
    }),
  ),
  on(productActions.findProductByCategorySuccess, (state, action) => ({
    ...state,
    products: action.payload,
    isLoading: false,
  })),

  on(productActions.findProductsByIdSuccess, (state, action) => ({
    ...state,
    product: action.payload,
    isLoading: false,
  })),
  on(
    productActions.findProductByCategoryFailure,
    productActions.findProductsByIdFailure,
    (state, action) => ({
      ...state,
      validationErrors: action.errors,
      isLoading: false,
    }),
  ),
);
