import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { OrderInterface } from '../../models/Order/order.interface';
import { HttpResponseInterface } from '../../models/Responses/httpResponse.interface';
import { SuccessMessageInterface } from '../../models/Responses/successMessage.interface';
import { orderActions, orderAdminActions } from './order.actions';
import { OrderService } from './order.services';

export const createOrderEffect = createEffect(
  (actions$ = inject(Actions), orderService = inject(OrderService)) => {
    return actions$.pipe(
      ofType(orderActions.createOrderRequest),
      switchMap(({ reqData }) => {
        return orderService.createOrder(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['order'] as OrderInterface;
          }),
          map((payload: OrderInterface) => {
            return orderActions.createOrderSuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              orderActions.createOrderFailure({
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

export const findOrderByIdEffect = createEffect(
  (actions$ = inject(Actions), orderService = inject(OrderService)) => {
    return actions$.pipe(
      ofType(orderActions.findOrderByIdRequest),
      switchMap(({ reqData }) => {
        return orderService.findOrderById(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['order'] as OrderInterface;
          }),
          map((payload: OrderInterface) => {
            return orderActions.findOrderByIdSuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              orderActions.findOrderByIdFailure({
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

export const getOrderHistoryEffect = createEffect(
  (actions$ = inject(Actions), orderService = inject(OrderService)) => {
    return actions$.pipe(
      ofType(orderActions.orderHistoryRequest),
      switchMap(() => {
        return orderService.getOrderHistory().pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['orders'] as OrderInterface[];
          }),
          map((payload: OrderInterface[]) => {
            return orderActions.orderHistorySuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              orderActions.orderHistoryFailure({
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

export const getAllOrdersEffect = createEffect(
  (actions$ = inject(Actions), orderService = inject(OrderService)) => {
    return actions$.pipe(
      ofType(orderAdminActions.getAllOrdersRequest),
      switchMap(() => {
        return orderService.getAllOrders().pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['orders'] as OrderInterface[];
          }),
          map((payload: OrderInterface[]) => {
            return orderAdminActions.getAllOrdersSuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              orderAdminActions.getAllOrdersFailure({
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

export const getConfirmedOrdersEffect = createEffect(
  (actions$ = inject(Actions), orderService = inject(OrderService)) => {
    return actions$.pipe(
      ofType(orderAdminActions.confirmedOrdersRequest),
      switchMap(({ reqData }) => {
        return orderService.getConfirmedOrders(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['orders'] as OrderInterface;
          }),
          map((payload: OrderInterface) => {
            return orderAdminActions.confirmedOrdersSuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              orderAdminActions.confirmedOrdersFailure({
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

export const getShippingOrdersEffect = createEffect(
  (actions$ = inject(Actions), orderService = inject(OrderService)) => {
    return actions$.pipe(
      ofType(orderAdminActions.shippedOrdersRequest),
      switchMap(({ reqData }) => {
        return orderService.getShippingOrders(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['orders'] as OrderInterface;
          }),
          map((payload: OrderInterface) => {
            return orderAdminActions.shippedOrdersSuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              orderAdminActions.shippedOrdersFailure({
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

export const getDeliveredOrdersEffect = createEffect(
  (actions$ = inject(Actions), orderService = inject(OrderService)) => {
    return actions$.pipe(
      ofType(orderAdminActions.deliveredOrdersRequest),
      switchMap(({ reqData }) => {
        return orderService.getDeliveredOrders(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['orders'] as OrderInterface;
          }),
          map((payload: OrderInterface) => {
            return orderAdminActions.deliveredOrdersSuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              orderAdminActions.deliveredOrdersFailure({
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

export const cancelOrderEffect = createEffect(
  (actions$ = inject(Actions), orderService = inject(OrderService)) => {
    return actions$.pipe(
      ofType(orderAdminActions.cancelOrderRequest),
      switchMap(({ reqData }) => {
        return orderService.cancelOrder(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['orders'] as OrderInterface;
          }),
          map((payload: OrderInterface) => {
            return orderAdminActions.cancelOrderSuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              orderAdminActions.cancelOrderFailure({
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

export const deleteOrderEffect = createEffect(
  (actions$ = inject(Actions), orderService = inject(OrderService)) => {
    return actions$.pipe(
      ofType(orderAdminActions.deleteOrderRequest),
      switchMap(({ reqData }) => {
        return orderService.deleteOrder(reqData).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.message as SuccessMessageInterface;
          }),
          map((payload: SuccessMessageInterface) => {
            return orderAdminActions.deleteOrderSuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              orderAdminActions.deleteOrderFailure({
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
