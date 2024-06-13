import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/AuthComponents/login/login.component';
import { RegisterComponent } from './Components/AuthComponents/register/register.component';
import { HomeComponent } from './Components/Home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductDetailsComponent } from './Components/products/product-details/product-details.component';
import { ProductsComponent } from './Components/products/products.component';
import { ProfileComponent } from './Components/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
