import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { PersistenceService } from '../../Store/Auth/auth.persistence.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const persistenceService = inject(PersistenceService);
  const router = inject(Router);
  console.log('Intercepted request:', request);
  const token = persistenceService.get('accessToken') ?? '';
  console.log('accessToken ', token);

  request = request.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        persistenceService.set('accessToken ', null);
        router.navigate(['/']);
      }
      return throwError(() => error);
    }),
  );
};
