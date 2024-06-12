import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../Store/AppState';
import { UserService } from '../../Store/User/user.services';
import { selectCurrentUser } from '../../Store/selectors';
import { AuthStateInterface } from '../../models/Auth/authState.interface';
import { CurrentUserInterface } from '../../models/User/currentUser.interface';
import { UserInterface } from '../../models/User/user.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatButton],

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  currentUser$: Observable<CurrentUserInterface | null | undefined>;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private userService: UserService,
  ) {
    this.userService = userService;
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  ngOnInit(): void {}
}
