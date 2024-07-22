import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';

import { MatInputModule } from '@angular/material/input';
import { BackendErrorsComponent } from '../../../ErrorHandling/backend-errors/backend-errors.component';
import { authActions } from '../../../Store/Auth/auth.actions';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../../Store/Auth/auth.reducer';
import { LoginRequestInterface } from '../../../models/Requests/loginRequest.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    BackendErrorsComponent,
    MatInputModule,
  ],
})
export class LoginComponent {
  @Input() changeTemplate: any;
  @Input() backendErrors: any;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.fb = fb;
  }
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  loginForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    // TO DO Changed minLength to 3 here. Change back to 8 after testing.
  });

  submitForm(): void {
    console.log('form', this.loginForm.getRawValue());
    const request: LoginRequestInterface = this.loginForm.getRawValue();
    this.store.dispatch(authActions.login({ request }));
  }
}
