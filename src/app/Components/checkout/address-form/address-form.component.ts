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
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  concatMap,
  filter,
  firstValueFrom,
  map,
  Observable,
  take,
  tap,
} from 'rxjs';
import { addressActions } from '../../../Store/Address/address.actions';
import { AppState } from '../../../Store/AppState';
import { selectUserAddresses } from '../../../Store/Auth/auth.reducer';
import { selectCart } from '../../../Store/Cart/cart.reducer';
import { orderActions } from '../../../Store/Order/order.actions';
import {
  selectOrder,
  selectUserOrder,
} from '../../../Store/Order/order.reducer';
import { OrderService } from '../../../Store/Order/order.services';
import { AddressInterface } from '../../../models/Address/address.interface';
import { OrderInterface } from '../../../models/Order/order.interface';
import { CreateOrderRequest } from '../../../models/Requests/createOrderRequest.interface';
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
  order$: Observable<OrderInterface | undefined>;

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
    private store: Store<AppState>,
  ) {
    this.addressList$ = this.store.select(selectUserAddresses);
    this.order$ = this.store.select(selectOrder);
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.addressList$.subscribe((addresses) =>
      console.log('AddressList', addresses),
    );
  }
  handleCreateOrder(orderAddress: AddressInterface) {
    firstValueFrom(this.store.select(selectCart))
      .then((cart) => {
        if (cart) {
          const reqData: CreateOrderRequest = {
            address: orderAddress,
            cart: cart,
          };
          console.log(reqData);
          console.log(reqData.address);
          console.log(reqData.cart);

          // Dispatch the createOrderRequest action and then subscribe to the order$
          this.store.dispatch(orderActions.createOrderRequest({ reqData }));

          this.order$
            .pipe(
              filter((order) => !!order), // Filter out undefined or null values
              take(1), // Complete the observable after receiving the first value
              map((order) => order.orderId), // Map to the order ID
              concatMap((orderId: number) => {
                // Navigate to the payment page
                console.log('Order ID:', orderId);
                return this.router.navigate([`checkout/payment/${orderId}`]);
              }),
            )
            .subscribe(
              () => {},
              (error) => {
                console.error('Error:', error);
              },
            );
        } else {
          // Handle case where cart is undefined
          console.error('Cart is undefined');
        }
      })
      .catch((error: any) => {
        // Handle errors
        console.error('Error getting cart:', error);
      });
  }

  handleAddAddress() {
    const formValue: AddressInterface = this.myForm.value;
    const action$ = this.store.dispatch(
      addressActions.addAddressRequest({ reqData: formValue }),
    );

    console.log('Action:', action$);
    console.log('form', formValue);
  }
}
