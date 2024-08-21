import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { productActions } from './product.action';
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
            return httpResponse.data['product'] as ProductInterface;
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
        return productService.findProductsByCategoryPage(reqData).pipe(
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
      ofType(productActions.getAllProductsRequest),
      switchMap(() => {
        return productService.getAllProducts().pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['products'] as ProductInterface[];
          }),
          map((payload: ProductInterface[]) => {
            return productActions.getAllProductsSuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              productActions.getAllProductsFailure({
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
      ofType(productActions.createProductRequest),
      switchMap(({ reqData }) => {
        return productService.addProducts(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['products'] as ProductInterface;
          }),
          map((payload: ProductInterface) => {
            return productActions.createProductSuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              productActions.createProductFailure({
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
      ofType(productActions.createMultipleProductsRequest),
      switchMap(({ reqData }) => {
        return productService.addMultipleProducts(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.message as SuccessMessageInterface;
          }),
          map((payload) => {
            return productActions.createMultipleProductsSuccess({
              payload,
            });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              productActions.createMultipleProductsFailure({
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
      ofType(productActions.deleteProductRequest),
      switchMap(({ reqData }) => {
        return productService.deleteProduct(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.message as SuccessMessageInterface;
          }),
          map((payload) => {
            return productActions.deleteProductSuccess({
              payload,
            });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              productActions.deleteProductFailure({
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
      ofType(productActions.updateProductRequest),
      switchMap(({ reqData }) => {
        return productService.deleteProduct(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['product'] as ProductInterface;
          }),
          map((payload) => {
            return productActions.updateProductSuccess({
              payload,
            });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              productActions.updateProductFailure({
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
