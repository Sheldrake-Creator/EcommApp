import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./Shared/Footer/footer.component";
import { NavbarComponent } from "./Shared/Navbar/navbar.component";
import { HomeComponent } from './Shared/Home/home.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { AppState } from './Shared/State/AppState';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, FooterComponent, NavbarComponent, HomeComponent, MatMenuTrigger]
})
export class AppComponent implements OnInit {
  title = 'EcommApp';

  userProfile: any;

  constructor (private router: Router,
    // private userService:UserService,
    private store: Store<AppState>,
    // private cartServices: CartService
  ){}


  ngOnInit(){}
  
}
