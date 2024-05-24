import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Shared/State/Auth/Store/register/register.component';
import { HomeComponent } from './Shared/Home/home.component';
import { LoginComponent } from './Shared/State/Auth/Store/login/login.component';

export const routes: Routes = [    
    {path: "" , component: HomeComponent},
    {path: "", component: LoginComponent},
    {path: "", component : RegisterComponent},
];


@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}

