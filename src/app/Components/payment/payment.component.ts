import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartInterface } from '../../models/Cart/cart.interface';
import { OrderInterface } from '../../models/Order/order.interface';
import { OrderStateInterface } from '../../models/State/orderState.interface';
import { cartActions } from '../../Store/Cart/cart.actions';
import { selectCart } from '../../Store/Cart/cart.reducer';
import { orderActions } from '../../Store/Order/order.actions';
import { selectOrder } from '../../Store/Order/order.reducer';
import { AddressCardComponent } from '../address-card/address-card.component';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [AddressCardComponent, CommonModule, CartItemComponent, MatDivider],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  products = [1, 1, 1, 1];
  address: any;
  id?: string;
  orderId?: number;
  order$?: Observable<OrderInterface | undefined>;
  userCart$: Observable<CartInterface | undefined> | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<OrderStateInterface>,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('orderId ', id);
    this.orderId = parseInt(id!);

    this.loadUserOrder(this.orderId);

    this.store.dispatch(cartActions.getCartRequest());
    this.userCart$ = this.store.select(selectCart);

    // pipe(select((store) => store.order)).subscribe((order) => {
    //   this.order = order.order;
    // });
  }
  private loadUserOrder(orderId: number) {
    this.store.dispatch(
      orderActions.findOrderByIdRequest({ reqData: orderId }),
    );
    this.order$ = this.store.select(selectOrder);
  }
  private loadUserCart() {
    this.userCart$ = this.store.select(selectCart);
  }
}
