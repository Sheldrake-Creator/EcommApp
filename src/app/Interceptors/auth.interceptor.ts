import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { PersistenceService } from '../Store/Auth/auth.persistence.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const persistenceService = inject(PersistenceService);
  console.log('Intercepted request:', request);
  const token = persistenceService.get('accessToken') ?? '';
  console.log('accessToken ', token);

  request = request.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  return next(request);
};
