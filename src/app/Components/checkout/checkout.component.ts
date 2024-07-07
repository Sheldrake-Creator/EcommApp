import { Component } from '@angular/core';
import { AddressFormComponent } from '../checkout/address-form/address-form.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [AddressFormComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

}
