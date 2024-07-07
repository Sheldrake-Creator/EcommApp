import { FeatureConfig, createFeature, createReducer, on } from '@ngrx/store';
import { OrderStateInterface } from '../../models/State/orderState.interface';
import { orderActions, orderAdminActions } from './order.actions';

const initialState: {
  userOrder: OrderStateInterface;
  adminOrder: OrderStateInterface;
} = {
  userOrder: {
    orders: [],
    isLoading: false,
    validationErrors: null,
    order: undefined,
  },
  adminOrder: {
    orders: [],
    isLoading: false,
    validationErrors: null,
    order: undefined,
  },
};

export const orderFeature = createFeature({
  name: 'order',
  reducer: createReducer(
    initialState,
    on(
      orderActions.addAddressRequest,
      orderActions.createOrderRequest,
      orderActions.findOrderByIdRequest,
      orderActions.orderHistoryRequest,
      orderAdminActions.cancelOrderRequest,
      orderAdminActions.confirmedOrdersRequest,
      orderAdminActions.deleteOrderRequest,
      orderAdminActions.deliveredOrdersRequest,
      orderAdminActions.shippedOrdersRequest,
      (state) => ({
        ...state,
        userOrder: {
          ...state.userOrder,
          isLoading: true,
          validationErrors: null,
        },
        adminOrder: {
          ...state.adminOrder,
          isLoading: true,
          validationErrors: null,
        },
      }),
    ),
    on(
      orderActions.addAddressFailure,
      orderActions.findOrderByIdFailure,
      orderActions.createOrderFailure,
      orderActions.orderHistoryFailure,
      orderAdminActions.cancelOrderFailure,
      orderAdminActions.confirmedOrdersFailure,
      orderAdminActions.deliveredOrdersFailure,
      orderAdminActions.getAllOrdersFailure,
      orderAdminActions.shippedOrdersFailure,
      (state, action) => ({
        ...state,
        userOrder: {
          ...state.userOrder,
          isLoading: false,
          validationErrors: action.errors,
        },
        adminOrder: {
          ...state.adminOrder,
          isLoading: false,
          validationErrors: action.errors,
        },
      }),
    ),
    on(orderActions.addAddressSuccess, (state, action) => ({
      ...state,
      userOrder: {
        ...state.userOrder,
        isLoading: false,
        validationErrors: null,
        // Add any other state updates specific to addAddressSuccess
      },
    })),
    on(orderActions.createOrderSuccess, (state, action) => ({
      ...state,
      userOrder: {
        ...state.userOrder,
        isLoading: false,
        order: action.payload,
        validationErrors: null,
      },
    })),
    on(orderActions.findOrderByIdSuccess, (state, action) => ({
      ...state,
      userOrder: {
        ...state.userOrder,
        isLoading: false,
        order: action.payload,
        validationErrors: null,
      },
    })),
    on(orderActions.orderHistorySuccess, (state, action) => ({
      ...state,
      userOrder: {
        ...state.userOrder,
        isLoading: false,
        orders: action.payload,
        validationErrors: null,
      },
    })),
    on(orderAdminActions.cancelOrderSuccess, (state, action) => ({
      ...state,
      adminOrder: {
        ...state.adminOrder,
        isLoading: false,
        order: action.payload,
        validationErrors: null,
      },
    })),
    on(orderAdminActions.confirmedOrdersSuccess, (state, action) => ({
      ...state,
      adminOrder: {
        ...state.adminOrder,
        isLoading: false,
        order: action.payload,
        validationErrors: null,
      },
    })),
    on(orderAdminActions.deliveredOrdersSuccess, (state, action) => ({
      ...state,
      adminOrder: {
        ...state.adminOrder,
        isLoading: false,
        order: action.payload,
        validationErrors: null,
      },
    })),
    on(orderAdminActions.getAllOrdersSuccess, (state, action) => ({
      ...state,
      adminOrder: {
        ...state.adminOrder,
        isLoading: false,
        orders: action.payload,
        validationErrors: null,
      },
    })),
    on(orderAdminActions.shippedOrdersSuccess, (state, action) => ({
      ...state,
      adminOrder: {
        ...state.adminOrder,
        isLoading: false,
        order: action.payload,
        validationErrors: null,
      },
    })),
  ),
});

export const {
  name: orderFeatureKey,
  reducer: orderReducer,
  selectUserOrder,
  selectAdminOrder,
} = orderFeature;
