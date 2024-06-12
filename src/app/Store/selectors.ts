import { createSelector } from '@ngrx/store';
import { AuthStateInterface } from '../models/Auth/authState.interface';

export const selectFeature = (state: { auth: AuthStateInterface }) =>
  state.auth;

export const selectIsSubmitting = createSelector(
  selectFeature,
  (state) => state.isSubmitting,
);
export const selectCurrentUser = createSelector(
  selectFeature,
  (state) => state.currentUser,
);
export const selectCurrentUserId = createSelector(
  selectFeature,
  (state) => state.currentUser?.userId,
);

export const isLoggedIn = createSelector(
  selectCurrentUser,
  (currentUser) => !!currentUser,
);
