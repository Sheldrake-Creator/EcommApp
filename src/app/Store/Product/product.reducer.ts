import { createFeature, createReducer, on } from '@ngrx/store';
import { ProductStateInterface } from '../../models/State/productState.interface';
import { productActions, productAdminActions } from './product.action';

const initialState: {
  userProduct: ProductStateInterface;
  adminProduct: ProductStateInterface;
} = {
  userProduct: {
    products: [],
    product: undefined,
    isLoading: false,
    validationErrors: null,
    successMessage: null,
  },
  adminProduct: {
    products: [],
    product: undefined,
    isLoading: false,
    validationErrors: null,
    successMessage: null,
  },
};

export const productFeature = createFeature({
  name: 'product',
  reducer: createReducer(
    initialState,
    // User Product Actions
    on(
      productActions.findProductsByIdRequest,
      productActions.findProductByCategoryRequest,
      (state) => ({
        ...state,
        userProduct: {
          ...state.userProduct,
          isLoading: true,
          validationErrors: null,
        },
      }),
    ),
    on(productActions.findProductsByIdSuccess, (state, action) => ({
      ...state,
      userProduct: {
        ...state.userProduct,
        isLoading: false,
        product: action.payload,
      },
    })),
    on(productActions.findProductByCategorySuccess, (state, action) => ({
      ...state,
      userProduct: {
        ...state.userProduct,
        isLoading: false,
        products: action.payload,
      },
    })),
    on(
      productActions.findProductsByIdFailure,
      productActions.findProductByCategoryFailure,
      (state, action) => ({
        ...state,
        userProduct: {
          ...state.userProduct,
          isLoading: false,
          validationErrors: action.errors,
        },
      }),
    ),
    // Admin Product Actions
    on(
      productAdminActions.getAllProductsRequest,
      productAdminActions.createProductRequest,
      productAdminActions.createMultipleProductsRequest,
      productAdminActions.deleteProductRequest,
      productAdminActions.updateProductRequest,
      (state) => ({
        ...state,
        adminProduct: {
          ...state.adminProduct,
          isLoading: true,
          validationErrors: null,
        },
      }),
    ),
    on(productAdminActions.getAllProductsSuccess, (state, action) => ({
      ...state,
      adminProduct: {
        ...state.adminProduct,
        isLoading: false,
        products: action.payload,
      },
    })),
    on(productAdminActions.createProductSuccess, (state, action) => ({
      ...state,
      adminProduct: {
        ...state.adminProduct,
        isLoading: false,
        product: action.payload,
      },
    })),
    on(productAdminActions.createMultipleProductsSuccess, (state, action) => ({
      ...state,
      adminProduct: {
        ...state.adminProduct,
        isLoading: false,
        successMessage: action.payload,
      },
    })),
    on(productAdminActions.deleteProductSuccess, (state, action) => ({
      ...state,
      adminProduct: {
        ...state.adminProduct,
        isLoading: false,
        successMessage: action.payload,
      },
    })),
    on(productAdminActions.updateProductSuccess, (state, action) => ({
      ...state,
      adminProduct: {
        ...state.adminProduct,
        isLoading: false,
        product: action.payload,
      },
    })),
    on(
      productAdminActions.getAllProductsFailure,
      productAdminActions.createProductFailure,
      productAdminActions.createMultipleProductsFailure,
      productAdminActions.deleteProductFailure,
      productAdminActions.updateProductFailure,
      (state, action) => ({
        ...state,
        adminProduct: {
          ...state.adminProduct,
          isLoading: false,
          validationErrors: action.errors,
        },
      }),
    ),
  ),
});

export const {
  name: productFeatureKey,
  reducer: productReducer,
  selectUserProduct,
  selectAdminProduct,
} = productFeature;
