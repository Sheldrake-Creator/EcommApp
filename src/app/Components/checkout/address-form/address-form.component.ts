import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { AddressCardComponent } from '../../../Shared/address-card/address-card.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input' ;
import {MatFormFieldModule} from '@angular/material/form-field';
import {OrderService} from "../../../Shared/State/Order/order.service";

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [MatDivider, MatIcon, MatButton, AddressCardComponent, CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent {
  addresses = [1,1,1];

  myForm:FormGroup=this.formBuilder.group({
    firstName:["",Validators.required],
    lastName:["",Validators.required],
    streetAddress:["",Validators.required],
    city:["",Validators.required],
    state:["",Validators.required],
    zipCode:["",Validators.required],
    mobile:["",Validators.required]
  });

  constructor(private formBuilder:FormBuilder, private orderService: OrderService){}
  handleCreateOrder(){

  }
  handleSubmit(){
    const formValue=this.myForm.value
    this.orderService.createOrder(formValue)
    console.log("form",formValue);
    

  }

}
