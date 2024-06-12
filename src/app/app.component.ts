import { Component, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { FooterComponent } from './Components/Footer/footer.component';
import { HomeComponent } from './Components/Home/home.component';
import { NavbarComponent } from './Components/Navbar/navbar.component';
import { AppState } from './Store/AppState';
import { authActions } from './Store/Auth/auth.actions';
import { AuthService } from './Store/Auth/auth.services';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    MatMenuTrigger,
  ],
})
export class AppComponent implements OnInit {
  title = 'EcommApp';

  userProfile: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {}
}
