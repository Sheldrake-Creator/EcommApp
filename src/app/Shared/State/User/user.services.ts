import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AppState } from '../AppState';
import { CurrentUserInterface } from '../Auth/Types/currentUser.interface';

import { UserResponseInterface } from './Types/userResponse.interface';
// import { logOutSuccess} from "../Auth/auth.actions";

import { RequestConstants as Constants } from '../../Constants/RequestConstants';
import { RegisterRequestInterface } from '../Auth/Types/registerRequest.interface';
import { selectCurrentUserId } from '../selectors';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = Constants.API_BASE_URL;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
  ) {}

  getUserProfileById(): Observable<CurrentUserInterface> {
    // const jwt = localStorage.getItem('accessToken');
    const userId$: Observable<any> = this.store.select(selectCurrentUserId);

    return this.http
      .post<UserResponseInterface>(
        this.apiUrl + Constants.GET_USER_BY_ID,
        userId$,
      )
      .pipe(
        tap((response) => console.log(response.user)),
        map((response) => response.user),
      );
  }

  onRegister(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<UserResponseInterface>(this.apiUrl + '/register', data)
      .pipe(map((response) => response.user));
  }
}

// .get<UserResponseInterface>(`${this.apiUrl}/users/profile`, data)
// .pipe(map((response)=> response.user))
