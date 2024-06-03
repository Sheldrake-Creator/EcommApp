import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatError, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { combineLatest } from 'rxjs';
import { BacknedErrorMessages } from "../../../../ErrorHandling/BackendErrors/backendErrors.component";
import { UserService } from '../../../User/user.services';
import { selectIsSubmitting } from '../../../selectors';
import { AuthStateInterface } from '../../Types/authState.interface';
import { RegisterRequestInterface } from '../../Types/registerRequest.interface';
import { authActions } from '../auth.actions';
import { selectValidationErrors } from '../auth.reducer';

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss',
    imports: [ReactiveFormsModule, RouterLink, CommonModule, MatFormFieldModule, FormsModule, MatButtonModule, FormsModule, MatError, MatLabel, MatInput, BacknedErrorMessages]
})
export class RegisterComponent {
  @Input() changeTemplate:any;
  @Output() onSubmitRegisterEvent= new EventEmitter();

  constructor(
    private fb: FormBuilder, 
    private store: Store<{auth:AuthStateInterface}>,
    private userService : UserService){
      this.fb = fb;
    }

  data$ = combineLatest({
    isSubmitting : this.store.select(selectIsSubmitting),
    backendErrors : this.store.select(selectValidationErrors),
  })

  registerForm : FormGroup =this.fb.nonNullable.group({
    userName:["",[Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]]
  });


  onSubmit(): void {
    console.log('form', this.registerForm.getRawValue())
    const request: RegisterRequestInterface = this.registerForm.getRawValue();
    this.store.dispatch(authActions.register({request}))
  }
  onSubmitRegister(){
    const request:RegisterRequestInterface=this.registerForm.getRawValue();
    
    this.userService.onRegister(request);
  }

}



