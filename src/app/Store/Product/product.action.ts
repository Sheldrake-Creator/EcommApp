import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { BackendErrorsInterface } from '../../models/Errors/backendErrors.interface';
import { ProductInterface } from '../../models/Product/product.interface';
import { FindProductsByCategoryRequest } from '../../models/Requests/findProductsByCategoryRequest.interface';

export const productActions = createActionGroup({
  source: 'product',
  events: {
    FindProductsByIdRequest: props<{ reqData: number }>(),
    'FindProductsById Success': props<{ payload: ProductInterface }>(),
    'FindProductsById Failure': props<{ errors: BackendErrorsInterface }>(),
    FindProductByCategoryRequest: props<{
      reqData: FindProductsByCategoryRequest;
    }>(),
    'FindProductByCategory Success': props<{ payload: ProductInterface[] }>(),
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
    CreateProductRequest: props<{ reqData: ProductInterface }>(),
    'CreateProduct Success': props<{ payload: ProductInterface }>(),
    'CreateProduct Failure': props<{ errors: BackendErrorsInterface }>(),
    createMultipleProductsRequest: props<{ reqData: ProductInterface[] }>(),
    'createMultipleProducts Success': props<{ payload: string }>(),
    'createMultipleProducts Failure': props<{
      errors: BackendErrorsInterface;
    }>(),
    deleteProductRequest: props<{ reqData: any }>(),
    'deleteProduct Success': props<{ payload: string }>(),
    'deleteProduct Failure': props<{ errors: BackendErrorsInterface }>(),
    updateProductRequest: props<{ reqData: number }>(),
    'updateProduct Success': props<{ payload: ProductInterface }>(),
    'updateProduct Failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
