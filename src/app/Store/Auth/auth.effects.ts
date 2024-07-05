import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { HttpResponseInterface } from '../../models/Responses/httpResponse.interface';
import { CurrentUserInterface } from '../../models/User/currentUser.interface';
import { authActions } from './auth.actions';
import { PersistenceService } from './auth.persistence.service';
import { AuthService } from './auth.services';

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistenceService = inject(PersistenceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return authService.register(request).pipe(
          map((httpResponse: HttpResponseInterface) => {
            return httpResponse.data['user'] as CurrentUserInterface;
          }),
          map((payload: CurrentUserInterface) => {
            console.log('Token: ', payload.token);
            persistenceService.set('accessToken', payload.token);
            return authActions.registerSuccess({ payload });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              authActions.registerFailure({
                errors: errorResponse.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authServices = inject(AuthService),
    persistenceService = inject(PersistenceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) => {
        return authServices.login(request).pipe(
          map((httpResponse: HttpResponseInterface) => {
            const user = httpResponse.data['user'] as CurrentUserInterface;
            return user;
          }),
          map((currentUser: CurrentUserInterface) => {
            console.log('Setting token: ', currentUser.token);
            persistenceService.set('accessToken', currentUser.token);
            return authActions.loginSuccess({ payload: currentUser });
          }),
          catchError((errorResponse: HttpResponseInterface) => {
            return of(
              authActions.loginFailure({
                errors: errorResponse.message,
              }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);
export const logoutEffect = createEffect(
  (actions$ = inject(Actions), authServices = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.logout),
      switchMap(() => {
        return authServices.logout();
      }),
      map((payload) => {
        return authActions.logoutSuccess({ payload });
      }),
      catchError((errorResponse: HttpResponseInterface) => {
        return of(authActions.logoutFailure());
      }),
    );
  },
  { functional: true },
);

// export const  logoutEffect = createEffect(
//     (actions$ = inject (Actions), authServices = inject(AuthService),
//     persistenceService = inject(PersistenceService)) =>{
//           return actions$.pipe(
//             ofType(authActions.logout),
//             switchMap(() => {
//               const curentUser = persistenceService.get('accessToken');
//               if (curentUser) {
//                // authServices.logout(curentUser);  Assuming logout expects a CurrentUserInterface with just the token
//                 persistenceService.set('accessToken', null); // Clear the token from local storage
//               }
//               return of(authActions.logout(curentUser));
//             })
//         )
//     },{functional:true}
// );

// dispatch: false
// export const logoutEffect = createEffect(
//     (actions$ = inject (Actions),
//     persistenceService = inject(PersistenceService)) =>{
//     return actions$.pipe(
//         ofType(authActions.logout),
//         map(({currentUser}) =>{
//             return persistenceService.get('accessToken',currentUser.token)
//                }),catchError((errorResponse : HttpErrorResponse)=>{
//                    return of(authActions.loginFailure({
//                        errors: errorResponse.error.errors
//                    }))
//                }),
//            )
//        })
//    )
// }, {functional : true}
// )
