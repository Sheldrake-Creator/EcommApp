import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { OrderInterface } from '../../models/Order/order.interface';
import { AppState } from '../../Store/AppState';
import { orderActions } from '../../Store/Order/order.actions';
import { selectOrder } from '../../Store/Order/order.reducer';
import { AddressCardComponent } from '../address-card/address-card.component';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { OrderCardComponent } from '../order/order-card/order-card.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    AddressCardComponent,
    CommonModule,
    CartItemComponent,
    MatDivider,
    OrderCardComponent,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  address: any;
  id?: string;
  orderId?: number;
  order$: Observable<OrderInterface | undefined>;
  // userCart$: Observable<CartInterface | undefined> | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    this.order$ = this.store
      .select(selectOrder)
      .pipe(tap((order) => console.log('order:', order)));
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('orderId');
    console.log('orderId ', id);
    this.orderId = parseInt(id!);

    this.loadUserOrder(this.orderId);
  }
  private loadUserOrder(orderId: number) {
    console.log('loading Order Data...');

    this.store.dispatch(
      orderActions.findOrderByIdRequest({ reqData: orderId }),
    );
  }
}
