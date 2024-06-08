import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { AppState } from '../AppState';
import { CurrentUserInterface } from '../Auth/Types/currentUser.interface';

import { UserResponseInterface } from './Types/userResponse.interface';
// import { logOutSuccess} from "../Auth/auth.actions";

import { RequestConstants as Constants } from '../../Constants/RequestConstants';
import { RegisterRequestInterface } from '../Auth/Types/registerRequest.interface';
import { selectCurrentUser, selectCurrentUserId } from '../selectors';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = Constants.API_BASE_URL;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
  ) {}
  //I don't actually need this method because I already have all the userInfo in the store
  //However, I can use this same structure to
  getUserProfileById(): Observable<CurrentUserInterface> {
    // const jwt = localStorage.getItem('accessToken');
    return this.store.select(selectCurrentUserId).pipe(
      switchMap((userId) => {
        return this.http
          .post<CurrentUserInterface>(this.apiUrl + Constants.GET_USER_BY_ID, {
            userId,
          })
          .pipe(
            tap((response) => console.log(response)),
            map((response) => response),
          );
      }),
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
