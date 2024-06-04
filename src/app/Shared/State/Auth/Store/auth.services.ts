import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectCurrentUser } from '../../selectors';
import { AuthResponseInterface } from '../Types/authResponse.interface';
import { CurrentUserInterface } from '../Types/currentUser.interface';
import { LoginRequestInterface } from '../Types/loginRequest.interface';
import { LogoutRequestInterface } from '../Types/logoutRequest.interface';
import { RegisterRequestInterface } from '../Types/registerRequest.interface';
import { PersistenceService } from './auth.persistence.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl = 'https://api.realworld.io/api';
  private apiUrl = 'http://localhost:4545';

  constructor(
    private http: HttpClient,
    private store: Store,
    private persistenceService: PersistenceService,
  ) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponseInterface>(this.apiUrl + '/register', data)
      .pipe(map((response) => response.user));
  }
  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponseInterface>(this.apiUrl + '/login', data)
      .pipe(map((response) => response.user));
  }
  logout() {
    this.persistenceService.set('accessToken', null);
    localStorage.removeItem('accessToken');
    selectCurrentUser.setResult(null);
  }

  //Impure Functions. Figure out how to persist the login state at a later date.
  //   formatUser(user:CurrentUserInterface){

  //   }

  //   loadCurrentUserFromLocalStorage() {
  //     const token = this.persistenceService.get('accessToken');
  //     if (token) {
  //       // Assuming you have a method to decode the token and get user info
  //       const currentUser= selectCurrentUser;
  //       return currentUser;
  //     }
  //     return undefined;
  // }
}
