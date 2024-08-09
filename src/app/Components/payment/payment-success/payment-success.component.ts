import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderInterface } from '../../../models/Order/order.interface';
import { OrderStateInterface } from '../../../models/State/orderState.interface';
import { AppState } from '../../../Store/AppState';
import { cartActions } from '../../../Store/Cart/cart.actions';
import { orderActions } from '../../../Store/Order/order.actions';
import { selectOrders } from '../../../Store/Order/order.reducer';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss',
})
export class PaymentSuccessComponent implements OnInit {
  order: any;
  userOrders$?: Observable<OrderInterface[] | undefined>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.store.dispatch(orderActions.orderHistoryRequest());
    this.userOrders$ = this.store.select(selectOrders);
    this.store.dispatch(cartActions.getCartRequest());
  }
}
