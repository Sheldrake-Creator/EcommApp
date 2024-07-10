import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CategoryInterface } from '../../models/Category/category.interface';
import { ProductInterface } from '../../models/Product/product.interface';
import { HttpResponseInterface } from '../../models/Responses/httpResponse.interface';
import { productActions } from '../Product/product.action';
import { categoryActions } from './category.actions';
import { CategoryServices } from './category.services';

export const getCategoriesByLevelEffect = createEffect(
  (actions$ = inject(Actions), categoryService = inject(CategoryServices)) => {
    return actions$.pipe(
      ofType(categoryActions.getCategoriesByLevelRequest),
      switchMap(({ reqData }) => {
        return categoryService.getCategoriesByLevel(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['category'] as CategoryInterface[];
          }),
          map((payload: CategoryInterface[]) => {
            return categoryActions.getCategoriesByLevelSuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              categoryActions.getCategoriesByLevelFailure({
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
