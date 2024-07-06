import { createReducer, on } from '@ngrx/store';
import { OrderStateInterface } from '../../models/State/orderState.interface';
import { productActions } from '../Product/product.action';
import { orderActions, orderAdminActions } from './order.actions';

const initialState: OrderStateInterface = {
  orders: [],
  isLoading: false,
  validationErrors: null,
  order: undefined,
};

export const orderReducer = createReducer(
  initialState,
  on(
    orderActions.addAddressRequest,
    orderActions.findOrderByIdRequest,
    orderActions.createOrderRequest,
    orderActions.orderHistoryRequest,
    orderAdminActions.cancelOrderRequest,
    orderAdminActions.confirmedOrdersRequest,
    orderAdminActions.deleteOrderRequest,
    orderAdminActions.deliveredOrdersRequest,
    orderAdminActions.shippedOrdersRequest,
    (state, action) => ({
      ...state,
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
    }),
  ),
  on(orderActions.addAddressSuccess, (state, action) => ({
    ...state,
  })),
  on(orderActions.createOrderSuccess, (state, action) => ({
    ...state,
  })),
  on(orderActions.findOrderByIdSuccess, (state, action) => ({
    ...state,
  })),
  on(orderActions.orderHistorySuccess, (state, action) => ({
    ...state,
  })),
  on(orderAdminActions.cancelOrderSuccess, (state, action) => ({
    ...state,
  })),
  on(orderAdminActions.confirmedOrdersSuccess, (state, action) => ({
    ...state,
  })),
  on(orderAdminActions.deliveredOrdersSuccess, (state, action) => ({
    ...state,
  })),
  on(orderAdminActions.getAllOrdersSuccess, (state, action) => ({
    ...state,
  })),
  on(orderAdminActions.shippedOrdersSuccess, (state, action) => ({
    ...state,
  })),
);
