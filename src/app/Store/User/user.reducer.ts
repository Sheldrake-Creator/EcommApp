import { createFeature, createReducer, on } from '@ngrx/store';
import { UserStateInterface } from '../../models/User/userState.interface';
import { userActions } from './user.actions';

const initialState: UserStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: undefined,
  validationErrors: null,
};

const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,
    on(userActions.getUserProfile, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(userActions.getUserProfileSuccess, (state, action) => ({
      ...state,
      isSubmitting: true,
      currentUser: action.currentUser,
    })),
    on(userActions.getUserProfileFailure, (state, error) => ({
      ...state,
      isSubmitting: false,
      validationErrors: error.errors,
    })),
  ),
});

export const {
  name: userFeatureKey,
  reducer: userReducer,
  selectIsSubmitting,
  selectCurrentUser,
  selectIsLoading,
  selectValidationErrors,
} = userFeature;
