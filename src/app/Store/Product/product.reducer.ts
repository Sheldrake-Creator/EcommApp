import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { ProductStateInterface } from '../../models/State/productState.interface';
import { productActions } from './product.action';

const initialState: ProductStateInterface = {
  products: [],
  product: undefined,
  isLoading: false,
  validationErrors: null,
  successMessage: null,
};

export const productFeature = createFeature({
  name: 'product',
  reducer: createReducer(
    initialState,
    on(productActions.findProductsByIdRequest, (state) => ({
      ...state,
      isLoading: true,
      validationErrors: null,
    })),
    on(productActions.findProductsByIdSuccess, (state, { payload }) => ({
      ...state,
      isLoading: false,
      product: payload,
    })),
    on(productActions.findProductsByIdFailure, (state, { errors }) => ({
      ...state,
      isLoading: false,
      validationErrors: errors,
    })),
    // on(productActions.FindProductByCategoryRequest, (state) => ({
    //   ...state,
    //   isLoading: true,
    //   validationErrors: null,
    // })),
    // on(productActions['FindProductByCategory Success'], (state, { payload }) => ({
    //   ...state,
    //   isLoading: false,
    //   products: payload,
    // })),
    // on(productActions['FindProductByCategory Failure'], (state, { errors }) => ({
    //   ...state,
    //   isLoading: false,
    //   validationErrors: errors,
    // })),
    on(productActions.getAllProductsRequest, (state) => ({
      ...state,
      isLoading: true,
      validationErrors: null,
    })),
    on(productActions.getAllProductsSuccess, (state, { payload }) => ({
      ...state,
      isLoading: false,
      products: payload,
    })),
    on(productActions.getAllProductsFailure, (state, { errors }) => ({
      ...state,
      isLoading: false,
      validationErrors: errors,
    })),
    // on(productActions.CreateProductRequest, (state) => ({
    //   ...state,
    //   isLoading: true,
    //   validationErrors: null,
    // })),
    // on(productActions['CreateProduct Success'], (state, { payload }) => ({
    //   ...state,
    //   isLoading: false,
    //   product: payload,
    // })),
    // on(productActions['CreateProduct Failure'], (state, { errors }) => ({
    //   ...state,
    //   isLoading: false,
    //   validationErrors: errors,
    // })),
    // on(productActions.CreateMultipleProductsRequest, (state) => ({
    //   ...state,
    //   isLoading: true,
    //   validationErrors: null,
    // })),
    // on(productActions['CreateMultipleProducts Success'], (state, { payload }) => ({
    //   ...state,
    //   isLoading: false,
    //   successMessage: payload,
    // })),
    // on(productActions['CreateMultipleProducts Failure'], (state, { errors }) => ({
    //   ...state,
    //   isLoading: false,
    //   validationErrors: errors,
    // })),
    // on(productActions.DeleteProductRequest, (state) => ({
    //   ...state,
    //   isLoading: true,
    //   validationErrors: null,
    // })),
    // on(productActions['DeleteProduct Success'], (state, { payload }) => ({
    //   ...state,
    //   isLoading: false,
    //   successMessage: payload,
    // })),
    // on(productActions['DeleteProduct Failure'], (state, { errors }) => ({
    //   ...state,
    //   isLoading: false,
    //   validationErrors: errors,
    // })),
    // on(productActions.UpdateProductRequest, (state) => ({
    //   ...state,
    //   isLoading: true,
    //   validationErrors: null,
    // })),
    // on(productActions['UpdateProduct Success'], (state, { payload }) => ({
    //   ...state,
    //   isLoading: false,
    //   product: payload,
    // })),
    // on(productActions['UpdateProduct Failure'], (state, { errors }) => ({
    //   ...state,
    //   isLoading: false,
    //   validationErrors: errors,
    // })),
  ),
});

export const {
  name: productFeatureKey,
  reducer: productReducer,
  selectIsLoading,
  selectProduct,
  selectProducts,
} = productFeature;

// Selectors
const selectProductState = (state: any) =>
  state[productFeatureKey] as ProductStateInterface;

export const selectLoading = createSelector(
  selectProductState,
  (state) => state.isLoading,
);

export const selectValidationErrors = createSelector(
  selectProductState,
  (state) => state.validationErrors,
);

export const selectSuccessMessage = createSelector(
  selectProductState,
  (state) => state.successMessage,
);
