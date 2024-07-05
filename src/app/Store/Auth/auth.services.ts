import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginRequestInterface } from '../../models/Requests/loginRequest.interface';
import { RegisterRequestInterface } from '../../models/Requests/registerRequest.interface';
import { HttpResponseInterface } from '../../models/Responses/httpResponse.interface';
import { selectCurrentUser } from '../selectors';
import { PersistenceService } from './auth.persistence.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:4545';

  constructor(
    private http: HttpClient,
    private persistenceService: PersistenceService,
  ) {}

  register(data: RegisterRequestInterface): Observable<HttpResponseInterface> {
    return this.http
      .post<HttpResponseInterface>(this.apiUrl + '/register', data)
      .pipe(map((response) => response));
  }
  login(data: LoginRequestInterface): Observable<HttpResponseInterface> {
    return this.http
      .post<HttpResponseInterface>(this.apiUrl + '/login', data)
      .pipe(map((response) => response));
  }
  logout(): string {
    this.persistenceService.set('accessToken', null);
    localStorage.removeItem('accessToken');
    selectCurrentUser.setResult(null);
    return 'User has Been Logged Out';
  }
}
