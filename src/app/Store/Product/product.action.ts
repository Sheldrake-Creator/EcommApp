import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { BackendErrorsInterface } from '../../models/Errors/backendErrors.interface';
import { ProductInterface } from '../../models/Product/product.interface';
import { CreateProductRequestInterface } from '../../models/Requests/createProductRequest';

import { FindProductsByCategoryPageRequest } from '../../models/Requests/findProductsByCategoryPageRequest.interface';
import { SuccessMessageInterface } from '../../models/Responses/successMessage.interface';

export const productActions = createActionGroup({
  source: 'Product',
  events: {
    FindProductsByIdRequest: props<{ reqData: number }>(),
    'FindProductsById Success': props<{ payload: ProductInterface }>(),
    'FindProductsById Failure': props<{ errors: BackendErrorsInterface }>(),
    FindProductByCategoryRequest: props<{
      reqData: FindProductsByCategoryPageRequest;
    }>(),
    'FindProductByCategory Success': props<{ payload: ProductInterface[] }>(),
    'FindProductByCategory Failure': props<{
      errors: BackendErrorsInterface;
    }>(),
    GetAllProductsRequest: emptyProps(),
    'GetAllProducts Success': props<{ payload: ProductInterface[] }>(),
    'GetAllProducts Failure': props<{ errors: BackendErrorsInterface }>(),
    CreateProductRequest: props<{ reqData: CreateProductRequestInterface }>(),
    'CreateProduct Success': props<{ payload: ProductInterface }>(),
    'CreateProduct Failure': props<{ errors: BackendErrorsInterface }>(),
    CreateMultipleProductsRequest: props<{
      reqData: CreateProductRequestInterface[];
    }>(),
    'CreateMultipleProducts Success': props<{
      payload: SuccessMessageInterface;
    }>(),
    'CreateMultipleProducts Failure': props<{
      errors: BackendErrorsInterface;
    }>(),
    DeleteProductRequest: props<{ reqData: any }>(),
    'DeleteProduct Success': props<{ payload: SuccessMessageInterface }>(),
    'DeleteProduct Failure': props<{ errors: BackendErrorsInterface }>(),
    UpdateProductRequest: props<{ reqData: number }>(),
    'UpdateProduct Success': props<{ payload: ProductInterface }>(),
    'UpdateProduct Failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
