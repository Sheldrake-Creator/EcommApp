import { createFeature, createReducer, on } from '@ngrx/store';
import { CategoryStateInterface } from '../../models/State/categoryState.interface';
import { categoryActions } from './category.actions';

const initialState: CategoryStateInterface = {
  isLoading: false,
  validationErrors: null,
  categories: undefined,
};

export const productFeature = createFeature({
  name: 'category',
  reducer: createReducer(
    initialState,
    on(categoryActions.getCategoriesByLevelRequest, (state) => ({
      ...state,
      isLoading: true,
      validationErrors: null,
    })),
    on(categoryActions.getCategoriesByLevelSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      categories: action.payload,
    })),
    on(categoryActions.getCategoriesByLevelFailure, (state, action) => ({
      ...state,
      isLoading: false,
      validationErrors: action.errors,
    })),
  ),
});
