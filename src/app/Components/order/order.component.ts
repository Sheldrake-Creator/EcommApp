import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { orderActions } from '../../Store/Order/order.actions';
import { selectOrder, selectOrders } from '../../Store/Order/order.reducer';
import { OrderInterface } from '../../models/Order/order.interface';
import { filters } from '../products/FilterData';
import { OrderCardComponent } from './order-card/order-card.component';
import { OrderTableComponent } from './order-table/order-table.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, MatCheckbox, OrderCardComponent, OrderTableComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  orders$?: Observable<OrderInterface[] | undefined>;
  orderFilter = [
    { value: 'pending', label: 'Pending' },
    { value: 'on_the _way', label: 'On The Way' },
    { value: 'delivered', label: 'Deliverd' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'returned', label: 'Returned' },
  ];

  constructor(
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit() {
    this.store.dispatch(orderActions.orderHistoryRequest());
    this.orders$ = this.store.select(selectOrders);
  }

  navigateToOrderDetails(orderId: Number) {
    this.router.navigate([`/order/${orderId}`]);
  }
}
