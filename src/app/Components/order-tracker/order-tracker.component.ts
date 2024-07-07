import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-order-tracker',
  standalone: true,
  imports: [CommonModule, MatIcon, MatDivider],
  templateUrl: './order-tracker.component.html',
  styleUrl: './order-tracker.component.scss'
})
export class OrderTrackerComponent {

  @Input() activeStep:any;
  @Input() steps:any;

}
