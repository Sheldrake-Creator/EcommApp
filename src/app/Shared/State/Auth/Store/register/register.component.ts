import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';
import { MatFormFieldModule, MatLabel, MatError } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { AuthStateInterface } from '../../Types/authState.interface';
import { selectIsSubmitting } from '../../../selectors';
import { selectValidationErrors } from '../auth.reducer';
import { RegisterRequestInterface } from '../../Types/registerRequest.interface';
import { authActions } from '../auth.actions';
import { MatDialog } from '@angular/material/dialog';
import { BacknedErrorMessages } from "../../../../ErrorHandling/BackendErrors/backendErrors.component";

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    imports: [ReactiveFormsModule, RouterLink, CommonModule, MatFormFieldModule, FormsModule, MatButtonModule, FormsModule, MatError, MatLabel, MatInput, BacknedErrorMessages]
})
export class RegisterComponent {
  @Input() changeTemplate:any;

  constructor(
    private fb: FormBuilder, 
    private store: Store<{auth:AuthStateInterface}>){
      this.fb = fb;
    }

  data$ = combineLatest({
    isSubmitting : this.store.select(selectIsSubmitting),
    backendErrors : this.store.select(selectValidationErrors),
  })

  registerForm : FormGroup =this.fb.nonNullable.group({
    username:["",[Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]]
  });


  onSubmit(): void {
    console.log('form', this.registerForm.getRawValue())
    const request: RegisterRequestInterface = {
    user: this.registerForm.getRawValue(),
    //TO DO: Might have to change .getRawValue() to .value
    }
    this.store.dispatch(authActions.register({request}))
  }
}




