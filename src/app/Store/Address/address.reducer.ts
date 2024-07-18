import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { UserStateInterface } from '../../models/User/userState.interface';
import { addressActions } from './address.actions';

const initialState: UserStateInterface = {
  isSubmitting: false,
  isLoading: false,
  validationErrors: null,
  currentUser: undefined,
};

export const addressFeature = createFeature({
  name: 'address',
  reducer: createReducer(
    initialState,
    on(
      addressActions.addAddressRequest,
      addressActions.updateAddressRequest,
      addressActions.removeAddressRequest,
      (state) => ({
        ...state,
        isLoading: true,
        validationErrors: null,
      }),
    ),
    on(
      addressActions.addAddressFailure,
      addressActions.updateAddressFailure,
      addressActions.removeAddressFailure,
      (state, action) => ({
        ...state,
        isLoading: false,
        validationErrors: action.errors,
      }),
    ),
    on(addressActions.addAddressSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentUser: {
        ...state.currentUser!,
        address: [...state.currentUser!.address, action.payload],
      },
    })),
    on(addressActions.updateAddressSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentUser: {
        ...state.currentUser!,
        address: [
          ...state.currentUser!.address.map((address) =>
            address.addressId === action.payload.addressId
              ? action.payload
              : address,
          ),
        ],
      },
    })),
    on(addressActions.removeAddressSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      validationErrors: null,
      currentUser: {
        ...state.currentUser!,
        address: [
          ...state.currentUser!.address.filter(
            (address) => address.addressId === action.payload.addressId,
          ),
        ],
      },
    })),
  ),
});

export const {
  name: addressFeatureKey,
  reducer: addressReducer,
  selectIsLoading,
  selectValidationErrors,
  select,
} = addressFeature;
