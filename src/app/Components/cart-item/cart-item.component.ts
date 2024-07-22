import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../Store/AppState';
import { cartActions } from '../../Store/Cart/cart.actions';
import { CartService } from '../../Store/Cart/cart.services';
import { CartItemInterface } from '../../models/Cart/cartItem.interface';
import { OrderItemInterface } from '../../models/Order/orderItem.interface';
import { UpdateCartItemRequestInterface } from '../../models/Requests/updateCartItemRequest.interface';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input() showButton: any;
  @Input() cartItem!: CartItemInterface;

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) {}

  updateCartItem(num: number): void {
    console.log('num', num);
    const updateCartItem: UpdateCartItemRequestInterface = {
      productId: this.cartItem.product.productId,
      quantity: num,
      size: this.cartItem.size,
      cartItemId: this.cartItem.cartItemId,
    };
    this.store.dispatch(
      cartActions.updateCartItemRequest({ reqData: updateCartItem }),
    );
  }

  removeCartItem(): void {
    console.log('remove item from cart');
    this.store.dispatch(
      cartActions.removeCartItemRequest({ reqData: this.cartItem.cartItemId }),
    );
  }
}
