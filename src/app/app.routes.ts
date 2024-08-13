import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/Home/home.component';
import { AboutComponent } from './Components/about/about.component';
import { AdminComponent } from './Components/admin/admin.component';
import { LoginComponent } from './Components/authentication/login/login.component';
import { RegisterComponent } from './Components/authentication/register/register.component';
import { CartComponent } from './Components/cart/cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { OrderTrackerComponent } from './Components/order-tracker/order-tracker.component';
import { OrderDetailsComponent } from './Components/order/order-details/order-details.component';
import { OrderComponent } from './Components/order/order.component';
import { PaymentInfoComponent } from './Components/payment/payment-info/payment-info.component';
import { PaymentSuccessComponent } from './Components/payment/payment-success/payment-success.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { ProductDetailsComponent } from './Components/products/product-details/product-details.component';
import { ProductsComponent } from './Components/products/products.component';
import { ProfileComponent } from './Components/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'about', component: AboutComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/item', component: ProductsComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'checkout/payment/:orderId', component: PaymentComponent },
  { path: 'checkout/payment/:orderId/info', component: PaymentInfoComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'orderTracker', component: OrderTrackerComponent },
  { path: 'account/orders', component: OrderComponent },
  { path: 'order/:orderId', component: OrderDetailsComponent },

  { path: ':levelOne/:levelTwo/:levelThree', component: ProductsComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
