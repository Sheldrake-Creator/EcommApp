import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { RegisterComponent } from './Store/register/register.component';
import { LoginComponent } from './Store/login/login.component';
import { AppState } from '../AppState';
import { isLoggedIn } from '../selectors';
import { LogoutComponent } from "./Store/logout/logout.component";


@Component({
    selector: 'app-auth',
    standalone: true,
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
    imports: [CommonModule, MatInputModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, StoreModule, RegisterComponent, LoginComponent, LogoutComponent]
})
export class AuthComponent implements OnInit{
  //Observables
  loginSwitch: any;
  isLoggedIn$: any;

  constructor(
    private store: Store<AppState>) {
  this.isLoggedIn$ = this.store.select(isLoggedIn);
}
  
  ngOnInit(): void {
    this.isLoggedIn$=!this.isLoggedIn$;
  }


  changeTemplate=()=>{
    this.loginSwitch=!this.loginSwitch;
  }
  

}
