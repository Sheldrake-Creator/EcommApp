import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../Shared/State/AppState';
import { CartService } from '../../Shared/State/Cart/cart.services';
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
export class CartComponent {
  cart = [1, 1, 1];
  cartItems: any;

  constructor(
    private router: Router,
    private cartService: CartService,
    private store: Store<AppState>,
  ) {}

  OnInit() {
    console.log('Hello..........');
    this.cartService.getCart();

    this.store.pipe(select((store) => store.cart)).subscribe((cart) => {
      this.cartItems = cart.cartItems;
      console.log('Cart Stores ', cart.cartItems);
    });
  }

  navigateToCheckout() {
    this.router.navigate(['checkout']);
  }
}
