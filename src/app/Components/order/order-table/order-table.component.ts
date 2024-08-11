import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { concatMap, filter, map, Observable, take } from 'rxjs';
import { OrderInterface } from '../../../models/Order/order.interface';
import { AppState } from '../../../Store/AppState';
import { orderActions } from '../../../Store/Order/order.actions';
import {
  selectOrders,
  selectUserOrder,
} from '../../../Store/Order/order.reducer';
import { formatDateTimeToDate } from '../../../Util/utilFunctions';

@Component({
  selector: 'app-order-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.scss',
})
export class OrderTableComponent implements OnInit {
  orders$?: Observable<OrderInterface[] | undefined>;

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.orders$ = this.store.select(selectOrders).pipe(
      filter((orders): orders is OrderInterface[] => !!orders),
      map((orders: OrderInterface[]) => {
        return orders.map((order) => {
          const formattedDate = formatDateTimeToDate(order.orderDate);
          console.log(formattedDate);
          return {
            ...order,
            orderDate: formattedDate, // Assign the formatted date string
          };
        });
      }),
    );
  }

  assignColor(order: OrderInterface): string {
    if (order.orderStatus === 'PENDING') {
      return 'bg-red-700';
    }
    // if (order.orderStatus === 'CONFIRMED') {
    //   return 'bg-green-500';
    // }
    else {
      return 'bg-yellow-500';
    }
  }
  // formatOrderDate(orderDate: string): string | null {
  //   return this.datePipe.transform(orderDate, 'yyyy-MM-dd');
  // }
}
