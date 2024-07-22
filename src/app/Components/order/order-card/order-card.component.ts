import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OrderItemInterface } from '../../../models/Order/orderItem.interface';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss',
})
export class OrderCardComponent {
  @Input() orderItems!: OrderItemInterface;

  constructor(private router: Router) {}

  navigateToOrderDetails(id: Number) {
    this.router.navigate([`orders/${id}`]);
  }
}
