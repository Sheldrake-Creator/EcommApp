import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddressFormComponent } from './address-form/address-form.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [AddressFormComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  constructor(private router: Router) {}

  navigateToPayment() {
    this.router.navigate(['checkout/payment/:id']);
  }
}
