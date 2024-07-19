import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AddressCardComponent } from '../../address-card/address-card.component';
import { OrderTrackerComponent } from '../../order-tracker/order-tracker.component';
import { OrderCardComponent } from '../order-card/order-card.component';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    CommonModule,
    AddressCardComponent,
    OrderCardComponent,
    OrderTrackerComponent,
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
})
export class OrderDetailsComponent {
  orders = [1, 1, 1];
  steps = [
    { id: 0, title: 'PLACED', isCompleted: true },
    { id: 1, title: 'CONFIRMED', isCompleted: false },
    { id: 2, title: 'SHIPPED', isCompleted: true },
    { id: 3, title: 'DELIVERED', isCompleted: true },
  ];
}
