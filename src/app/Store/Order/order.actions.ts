import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AddressInterface } from '../../models/Address/address.interface';
import { BackendErrorsInterface } from '../../models/Errors/backendErrors.interface';
import { OrderInterface } from '../../models/Order/order.interface';
import { CreateOrderRequest } from '../../models/Requests/createOrderRequest.interface';
import { SuccessMessageInterface } from '../../models/Responses/successMessage.interface';

export const orderActions = createActionGroup({
  source: 'userOrder',
  events: {
    CreateOrderRequest: props<{ reqData: CreateOrderRequest }>(), //? I might want this to take cart model as input
    'CreateOrder Success': props<{ payload: OrderInterface }>(),
    'CreateOrder Failure': props<{ errors: BackendErrorsInterface }>(),
    FindOrderByIdRequest: props<{ reqData: number }>(),
    'FindOrderById Success': props<{ payload: OrderInterface }>(),
    'FindOrderById Failure': props<{ errors: BackendErrorsInterface }>(),
    OrderHistoryRequest: emptyProps(),
    'OrderHistory Success': props<{ payload: OrderInterface[] }>(),
    'OrderHistory Failure': props<{ errors: BackendErrorsInterface }>(),
  },
});

export const orderAdminActions = createActionGroup({
  source: 'adminOrder',
  events: {
    GetAllOrdersRequest: emptyProps(),
    'GetAllOrders Success': props<{ payload: OrderInterface[] }>(),
    'GetAllOrders Failure': props<{ errors: BackendErrorsInterface }>(),
    confirmOrderRequest: props<{ reqData: number }>(),
    'confirmOrder Success': props<{ payload: OrderInterface }>(),
    'confirmOrder Failure': props<{ errors: BackendErrorsInterface }>(),
    ShippedOrdersRequest: props<{ reqData: number }>(),
    'ShippedOrders Success': props<{ payload: OrderInterface }>(),
    'ShippedOrders Failure': props<{ errors: BackendErrorsInterface }>(),
    DeliveredOrdersRequest: props<{ reqData: number }>(),
    'DeliveredOrders Success': props<{ payload: OrderInterface }>(),
    'DeliveredOrders Failure': props<{ errors: BackendErrorsInterface }>(),
    CancelOrderRequest: props<{ reqData: number }>(),
    'CancelOrder Success': props<{ payload: OrderInterface }>(),
    'CancelOrder Failure': props<{ errors: BackendErrorsInterface }>(),
    DeleteOrderRequest: props<{ reqData: number }>(),
    'DeleteOrder Success': props<{ payload: SuccessMessageInterface }>(),
    'DeleteOrder Failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
