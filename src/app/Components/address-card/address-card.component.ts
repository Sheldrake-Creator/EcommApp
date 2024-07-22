import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddressInterface } from '../../models/Address/address.interface';
import { UserStateInterface } from '../../models/User/userState.interface';

@Component({
  selector: 'app-address-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.scss',
})
export class AddressCardComponent {
  @Input() address: AddressInterface | undefined;

  constructor(private store: Store<UserStateInterface>) {}
}
