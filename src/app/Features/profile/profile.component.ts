import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Shared/State/User/user.services';
import { select, Store } from '@ngrx/store';
import { selectCurrentUser } from '../../Shared/State/selectors';
import { AppState } from '../../Shared/State/AppState';
import { Observable } from 'rxjs';
import { CurrentUserInterface } from '../../Shared/State/Auth/Types/currentUser.interface';
import { AuthStateInterface } from '../../Shared/State/Auth/Types/authState.interface';
import { UserInterface } from '../../Shared/State/User/Types/user.interface';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatButton],

templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  currentUser$: Observable<CurrentUserInterface | null | undefined>|undefined;

  user$: Observable<CurrentUserInterface | null | undefined>|undefined;



  constructor(private http: HttpClient, 
   private store:Store<AppState>, 
    private userService:UserService){
      this.userService = userService;
  }


    ngOnInit(): void {

      
    }


  }


