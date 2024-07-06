import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { productActions, productAdminActions } from './product.action';
import { ProductServices } from './product.service';

import { catchError, map, of, switchMap } from 'rxjs';
import { ProductInterface } from '../../models/Product/product.interface';
import { HttpResponseInterface } from '../../models/Responses/httpResponse.interface';
import { SuccessMessageInterface } from '../../models/Responses/successMessage.interface';

export const findProductsByIdEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductServices)) => {
    return actions$.pipe(
      ofType(productActions.findProductsByIdRequest),
      switchMap(({ reqData }) => {
        return productService.findProductsById(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['products'] as ProductInterface;
          }),
          map((payload: ProductInterface) => {
            return productActions.findProductsByIdSuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              productActions.findProductsByIdFailure({
                errors: errorResponse.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const findProductsByCategoryEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductServices)) => {
    return actions$.pipe(
      ofType(productActions.findProductByCategoryRequest),
      switchMap(({ reqData }) => {
        return productService.findProductsByCategory(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['products'] as ProductInterface[];
          }),
          map((payload: ProductInterface[]) => {
            return productActions.findProductByCategorySuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              productActions.findProductByCategoryFailure({
                errors: errorResponse.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const findAllProductsEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductServices)) => {
    return actions$.pipe(
      ofType(productAdminActions.getAllProductsRequest),
      switchMap(() => {
        return productService.getAllProducts().pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['products'] as ProductInterface[];
          }),
          map((payload: ProductInterface[]) => {
            return productAdminActions.getAllProductsSuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              productAdminActions.getAllProductsFailure({
                errors: errorResponse.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const createProductEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductServices)) => {
    return actions$.pipe(
      ofType(productAdminActions.createProductRequest),
      switchMap(({ reqData }) => {
        return productService.addProducts(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['products'] as ProductInterface;
          }),
          map((payload: ProductInterface) => {
            return productAdminActions.createProductSuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              productAdminActions.createProductFailure({
                errors: errorResponse.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const createMultipleProductsEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductServices)) => {
    return actions$.pipe(
      ofType(productAdminActions.createMultipleProductsRequest),
      switchMap(({ reqData }) => {
        return productService.addMultipleProducts(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.message as SuccessMessageInterface;
          }),
          map((payload) => {
            return productAdminActions.createMultipleProductsSuccess({
              payload,
            });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              productAdminActions.createMultipleProductsFailure({
                errors: errorResponse.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const deleteProductEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductServices)) => {
    return actions$.pipe(
      ofType(productAdminActions.deleteProductRequest),
      switchMap(({ reqData }) => {
        return productService.deleteProduct(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.message as SuccessMessageInterface;
          }),
          map((payload) => {
            return productAdminActions.deleteProductSuccess({
              payload,
            });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              productAdminActions.deleteProductFailure({
                errors: errorResponse.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const updateProductEffect = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductServices)) => {
    return actions$.pipe(
      ofType(productAdminActions.updateProductRequest),
      switchMap(({ reqData }) => {
        return productService.deleteProduct(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['product'] as ProductInterface;
          }),
          map((payload) => {
            return productAdminActions.updateProductSuccess({
              payload,
            });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              productAdminActions.updateProductFailure({
                errors: errorResponse.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);
