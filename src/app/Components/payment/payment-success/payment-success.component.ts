import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { OrderInterface } from '../../../models/Order/order.interface';
import { AppState } from '../../../Store/AppState';
import { cartActions } from '../../../Store/Cart/cart.actions';
import { orderAdminActions } from '../../../Store/Order/order.actions';
import { selectOrder } from '../../../Store/Order/order.reducer';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss',
})
export class PaymentSuccessComponent implements OnInit {
  order: any;
  userOrder$?: Observable<OrderInterface | undefined>;
  id!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.userOrder$ = this.store.select(selectOrder);
    this.userOrder$
      .pipe(
        map((order: OrderInterface | undefined) => {
          if (order) {
            this.id = order.orderId;
            console.log('id: ', this.id); // Log the retrieved id
          }
          return order;
        }),
      )
      .subscribe();

    this.store.dispatch(
      orderAdminActions.confirmOrderRequest({ reqData: this.id }),
    );

    this.store.dispatch(cartActions.getCartRequest());
  }
}
