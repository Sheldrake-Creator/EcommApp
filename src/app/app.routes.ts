import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Features/cart/cart.component';
import { ProfileComponent } from './Features/profile/profile.component';
import { HomeComponent } from './Shared/Home/home.component';
import { LoginComponent } from './Shared/State/Auth/Store/login/login.component';
import { RegisterComponent } from './Shared/State/Auth/Store/register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'api/cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
