import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';
import { AppState } from '../../Store/AppState';
import { cartActions } from '../../Store/Cart/cart.actions';
import { selectCart } from '../../Store/Cart/cart.reducer';
import { CartInterface } from '../../models/Cart/cart.interface';
import { CartItemInterface } from '../../models/Cart/cartItem.interface';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    CartItemComponent,
  ],
})
export class CartComponent implements OnInit {
  cart$: Observable<CartInterface | undefined>;
  cartItems$!: Observable<CartItemInterface[] | undefined>;

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.cart$ = this.store.pipe(select(selectCart));
  }

  ngOnInit(): void {
    console.log('Hello..........');
    this.store.dispatch(cartActions.getCartRequest());

    this.cartItems$ = this.cart$.pipe(
      filter((cart): cart is CartInterface => cart !== undefined),
      map((cart) => cart.cartItems),
    );
  }

  navigateToCheckout() {
    this.router.navigate(['checkout']);
  }
}
