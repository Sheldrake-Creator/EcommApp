import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersistenceService } from '../../Store/Auth/auth.persistence.service';
import { AuthService } from '../../Store/Auth/auth.services';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private persistenceService: PersistenceService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.persistenceService.get('accessToken');
    if (token) {
      console.log(token);
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(clonedReq);
    }
    return next.handle(req);
  }
}
