import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { BackendErrorsInterface } from '../../models/Errors/backendErrors.interface';
import { ProductInterface } from '../../models/Product/product.interface';

export const productActions = createActionGroup({
  source: 'product',
  events: {
    FindProductsByIdRequest: props<{ reqData: number }>(),
    'FindProductsById Success': props<{ payload: ProductInterface }>(),
    'FindProductsById Failure': props<{ errors: BackendErrorsInterface }>(),
    FindProductByCategoryRequest: props<{ reqData: number }>(),
    'FindProductByCategory Success': props<{ payload: ProductInterface }>(),
    'FindProductByCategory Failure': props<{
      errors: BackendErrorsInterface;
    }>(),
  },
});
export const productAdminActions = createActionGroup({
  source: 'productAdmin',
  events: {
    FindAllProductsRequest: emptyProps(),
    'FindAllProducts Success': props<{ payload: ProductInterface[] }>(),
    'FindAllProducts Failure': props<{ errors: BackendErrorsInterface }>(),
    CreateProductRequest: props<{ reqData: any }>,
    'CreateProductRequest Success': props<{ payload: ProductInterface }>(),
    'CreateProductRequest Failure': props<{ errors: BackendErrorsInterface }>(),
    createMultipleProductsRequest: props<{ reqData: any[] }>,
    'createMultipleProducts Success': props<{ payload: ProductInterface }>(),
    'createMultipleProducts Failure': props<{
      errors: BackendErrorsInterface;
    }>(),
    deleteProductRequest: props<{ reqData: any }>,
    'deleteProduct Success': props<{ payload: string }>(),
    'deleteProduct Failure': props<{ errors: BackendErrorsInterface }>(),
    updateProductRequest: props<{ reqData: any }>,
    'updateProduct Success': props<{ payload: ProductInterface }>(),
    'updateProduct Failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
