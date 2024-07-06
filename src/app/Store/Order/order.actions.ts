import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AddressInterface } from '../../models/Address/address.interface';
import { BackendErrorsInterface } from '../../models/Errors/backendErrors.interface';
import { OrderInterface } from '../../models/Order/order.interface';

export const orderActions = createActionGroup({
  source: 'order',
  events: {
    AddAddressRequest: props<{ reqData: AddressInterface }>(),
    'AddAddress Success': props<{ payload: OrderInterface }>(),
    'AddAddress Failure': props<{ errors: BackendErrorsInterface }>(),
    CreateOrderRequest: emptyProps(),
    'CreateOrder Success': props<{ payload: OrderInterface[] }>(),
    'CreateOrder Failure': props<{ errors: BackendErrorsInterface }>(),
    OrderHistoryRequest: emptyProps(),
    'OrderHistory Success': props<{ payload: OrderInterface }>(),
    'OrderHistory Failure': props<{ errors: BackendErrorsInterface }>(),
    FindOrderByIdRequest: emptyProps(),
    'FindOrderById Success': props<{ payload: OrderInterface }>(),
    'FindOrderById Failure': props<{ errors: BackendErrorsInterface }>(),
  },
});

export const orderAdminActions = createActionGroup({
  source: 'adminOrder',
  events: {
    GetAllOrdersRequest: emptyProps(),
    'GetAllOrders Success': props<{ payload: OrderInterface[] }>(),
    'GetAllOrders Failure': props<{ errors: BackendErrorsInterface }>(),
    ConfirmedOrdersRequest: props<{ reqData: string }>(),
    'ConfirmedOrders Success': props<{ payload: OrderInterface[] }>(),
    'ConfirmedOrders Failure': props<{ errors: BackendErrorsInterface }>(),
    ShippedOrdersRequest: props<{ reqData: string }>(),
    'ShippedOrders Success': props<{ payload: OrderInterface[] }>(),
    'ShippedOrders Failure': props<{ errors: BackendErrorsInterface }>(),
    DeliveredOrdersRequest: props<{ reqData: string }>(),
    'DeliveredOrders Success': props<{ payload: OrderInterface[] }>(),
    'DeliveredOrders Failure': props<{ errors: BackendErrorsInterface }>(),
    CancelOrderRequest: props<{ reqData: string }>(),
    'CancelOrder Success': props<{ payload: OrderInterface[] }>(),
    'CancelOrder Failure': props<{ errors: BackendErrorsInterface }>(),
    DeleteOrderRequest: props<{ reqData: string }>(),
    'DeleteOrder Success': props<{ payload: OrderInterface[] }>(),
    'DeleteOrder Failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
