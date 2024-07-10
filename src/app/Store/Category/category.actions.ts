import { createActionGroup, props } from '@ngrx/store';
import { CategoryInterface } from '../../models/Category/category.interface';
import { BackendErrorsInterface } from '../../models/Errors/backendErrors.interface';

export const categoryActions = createActionGroup({
  source: 'category',
  events: {
    GetCategoriesByLevelRequest: props<{ reqData: number }>(),
    'GetCategoriesByLevel Success': props<{ payload: CategoryInterface[] }>(),
    'GetCategoriesByLevel Failure': props<{
      errors: BackendErrorsInterface;
    }>(),
  },
});
