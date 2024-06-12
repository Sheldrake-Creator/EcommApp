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
  MatError,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { BacknedErrorMessages } from '../../../ErrorHandling/BackendErrors/backendErrors.component';
import { authActions } from '../../../Store/Auth/auth.actions';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../../Store/Auth/auth.reducer';
import { AuthService } from '../../../Store/Auth/auth.services';
import { LoginRequestInterface } from '../../../models/Requests/loginRequest.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatLabel,
    MatError,
    MatInput,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    BacknedErrorMessages,
  ],
})
export class LoginComponent {
  @Input() changeTemplate: any;

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
