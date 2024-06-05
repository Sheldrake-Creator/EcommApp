import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { rootEffectsInit } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { PersistenceService } from '../../State/Auth/Store/auth.persistence.service';
import { AuthService } from '../../State/Auth/Store/auth.services';

@Component({
  selector: 'app-auth-interceptor',
  standalone: true,
  imports: [],
  templateUrl: './auth-interceptor.component.html',
  styleUrl: './auth-interceptor.component.scss'
})
@Injectable({
  providedIn: 'root',

})
export class AuthInterceptorComponent implements HttpInterceptor {

  constructor(private persistenceService: PersistenceService){}



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token =this.persistenceService.get('accessToken');
    if(token){
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(clonedReq);
    }
    return next.handle(req);
  }

}


