import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../Shared/State/Cart/cart.services';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input() showButton: any;
  @Input() cartItem: any;

  constructor(private cartServices: CartService) {}

  updateCartItem(num: Number) {
    console.log('num', num);
    this.cartServices.updateCartItem({
      cartItemId: this.cartItem.id,
      data: { quantity: num + this.cartItem.quantity },
    });
  }
  removeCartItem() {
    console.log('remove item from cart');
    this.cartServices.removeCartItem(this.cartItem.id);
  }
}
