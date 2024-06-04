import { Component, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { FooterComponent } from './Shared/Footer/footer.component';
import { HomeComponent } from './Shared/Home/home.component';
import { NavbarComponent } from './Shared/Navbar/navbar.component';
import { AppState } from './Shared/State/AppState';
import { authActions } from './Shared/State/Auth/Store/auth.actions';
import { AuthService } from './Shared/State/Auth/Store/auth.services';

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
