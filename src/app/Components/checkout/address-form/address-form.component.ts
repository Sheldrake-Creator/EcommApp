import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { OrderService } from '../../../Store/Order/order.services';
import { AddressInterface } from '../../../models/Address/address.interface';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { selectUserAddresses } from '../../../Store/Auth/auth.reducer';
import { UserStateInterface } from '../../../models/User/userState.interface';
import { AddressCardComponent } from '../../address-card/address-card.component';

@Component({
  selector: 'app-address-form',
  standalone: true,
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
  imports: [
    MatDivider,
    MatIcon,
    MatButton,
    AddressFormComponent,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    AddressCardComponent,
  ],
})
export class AddressFormComponent implements OnInit {
  @Input() addressList$: Observable<AddressInterface[] | undefined>;

  myForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    streetAddress: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required],
    mobile: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private orderService: OrderService,
    private store: Store<UserStateInterface>,
  ) {
    this.addressList$ = this.store.select(selectUserAddresses);
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.addressList$.subscribe((addresses) =>
      console.log('AddressList', addresses),
    );
  }
  handleCreateOrder() {
    this.handleSubmit();
    this.router.navigate(['orderTracker']);
  }
  handleSubmit() {
    const formValue: AddressInterface = this.myForm.value;
    this.orderService.addAddress(formValue);
    console.log('form', formValue);
  }
}
