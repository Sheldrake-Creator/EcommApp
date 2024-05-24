import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {Store} from '@ngrx/store';
import { AuthService } from '../auth.services';
import { LoginRequestInterface } from '../../Types/loginRequest.interface';
import { authActions } from '../auth.actions';
import { combineLatest } from 'rxjs';
import { selectIsSubmitting, selectValidationErrors } from '../auth.reducer';
import { BacknedErrorMessages } from "../../../../ErrorHandling/BackendErrors/backendErrors.component";



@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [MatFormFieldModule, FormsModule, MatLabel, MatError, MatInput, ReactiveFormsModule, MatButtonModule, CommonModule, BacknedErrorMessages]
})
export class LoginComponent {

  @Input() changeTemplate:any;


  constructor(
    private fb:FormBuilder, 
    private store: Store, ){
    this.fb=fb;
  }
  data$ = combineLatest({
    isSubmitting : this.store.select(selectIsSubmitting),
    backendErrors : this.store.select(selectValidationErrors),
  })

  loginForm : FormGroup =this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  submitForm():void{
    console.log('form', this.loginForm.getRawValue())
    const request:LoginRequestInterface={
      user: this.loginForm.getRawValue(),
    }
    this.store.dispatch(authActions.login({request}))
  }
}
