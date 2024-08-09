import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../Store/AppState';
import { orderActions } from '../../../Store/Order/order.actions';
import { selectUserOrder } from '../../../Store/Order/order.reducer';
import { AddressCardComponent } from '../../address-card/address-card.component';
import { AddressFormComponent } from '../../checkout/address-form/address-form.component';

@Component({
  selector: 'app-payment-info',
  standalone: true,
  imports: [
    MatCheckboxModule,
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
  templateUrl: './payment-info.component.html',
  styleUrl: './payment-info.component.scss',
})
export class PaymentInfoComponent implements OnInit {
  myRadios!: NodeListOf<HTMLElement>;
  setCheck: HTMLInputElement | null = null;
  @ViewChild('useSameAddressCheckbox', { static: true })
  useSameAddressCheckbox!: ElementRef<HTMLElement>;
  orderId!: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.myRadios = document.querySelectorAll<HTMLInputElement>('.tabs2');
    this.setCheckHandler();
    const id = this.activatedRoute.snapshot.paramMap.get('orderId');
    console.log('orderId ', id);
    this.orderId = parseInt(id!);
  }

  billingAddress: FormGroup = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    streetAddress: [''],
    city: [''],
    state: [''],
    zipCode: [''],
    mobile: [''],
  });
  creditCardInfo: FormGroup = this.formBuilder.group({
    cardNum: [''],
    expiration: [''],
    ccv: [''],
    zipCode: [''],
  });

  setCheckHandler(): void {
    this.myRadios.forEach((radio) => {
      radio.addEventListener('click', () => {
        const radioInput = radio as HTMLInputElement;
        if (this.setCheck !== radioInput) {
          this.setCheck = radioInput;
        } else {
          radioInput.checked = false;
          this.setCheck = null;
        }
      });
    });
    this.useSameAddressCheckbox.nativeElement.addEventListener(
      'change',
      (event: Event) => {
        const checkbox = event.target as HTMLInputElement;
        if (checkbox.checked) {
          this.closeAccordion();
        }
      },
    );
  }

  closeAccordion(): void {
    // Add logic here to close the accordion window
    this.setCheck = null;
    this.myRadios.forEach((radio) => {
      const radioInput = radio as HTMLInputElement;
      radioInput.checked = false;
    });
  }

  completePayment() {
    this.store.dispatch(
      orderActions.confirmOrderRequest({ reqData: this.orderId }),
    );
    this.router.navigate(['payment-success']);
  }
}
