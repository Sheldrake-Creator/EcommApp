import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { BackendErrorsComponent } from '../../../ErrorHandling/backend-errors/backend-errors.component';
import { authActions } from '../../../Store/Auth/auth.actions';
import { selectValidationErrors } from '../../../Store/Auth/auth.reducer';
import { UserService } from '../../../Store/User/user.services';
import { selectIsSubmitting } from '../../../Store/selectors';
import { RegisterRequestInterface } from '../../../models/Requests/registerRequest.interface';
import { AuthStateInterface } from '../../../models/State/authState.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    BackendErrorsComponent,
    CommonModule,
    MatInputModule,
  ],
})
export class RegisterComponent {
  @Input() changeTemplate: any;
  @Output() onSubmitRegisterEvent = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthStateInterface }>,
    private userService: UserService,
  ) {
    this.fb = fb;
  }

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  registerForm: FormGroup = this.fb.nonNullable.group({
    userName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit(): void {
    console.log('form', this.registerForm.getRawValue());
    const request: RegisterRequestInterface = this.registerForm.getRawValue();
    this.store.dispatch(authActions.register({ request }));
  }

  onSubmitRegister() {
    const request: RegisterRequestInterface = this.registerForm.getRawValue();
    this.userService.onRegister(request);
  }
}
