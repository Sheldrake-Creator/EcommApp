import { HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, switchMap, tap } from "rxjs";
import { CurrentUserInterface } from "../Types/currentUser.interface";
import { authActions } from "./auth.actions";
import { PersistenceService } from "./auth.persistence.service";
import { AuthService } from "./auth.services";


export const registerEffect = createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService), persistenceService = inject(PersistenceService)) => {
    return actions$.pipe(
        ofType(authActions.register),
        switchMap(({ request }) => {
            return authService.register(request).pipe(
                map((currentUser: CurrentUserInterface) => {
                    persistenceService.set('accessToken',currentUser.token)
                    return authActions.registerSuccess({ currentUser })
                }),catchError((errorResponse :HttpErrorResponse) => {
                    return of(authActions.registerFailure({
                        errors: errorResponse.error
                    }))
                }),
            )
        }) 
    )
}, { functional: true }
)

export const loginEffect = createEffect(
    (actions$ = inject (Actions), authServices = inject(AuthService),
    persistenceService = inject(PersistenceService)) =>{
    return actions$.pipe(
        ofType(authActions.login),
        switchMap(({request}) =>{
            return authServices.login(request).pipe(
                map((currentUser : CurrentUserInterface) =>{
                    persistenceService.set('accessToken',currentUser.token)
                    return authActions.loginSuccess({currentUser})
                }),catchError((errorResponse : HttpErrorResponse)=>{
                    return of(authActions.loginFailure({
                        errors: errorResponse.error.errors
                    }))
                }),                    
            )
        })
    )
}, {functional : true}
)
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


// export const closeAfterRegisterEffect = createEffect(
//     (actions$ = inject(Actions), nav = inject(NavbarComponent)) =>{
//         return actions$.pipe(
//             ofType(authActions.registerSuccess),
//             tap(() =>{
//                 // nav.handleCloseWindow();
                
//             }
//         ))
//     },
//     {functional:true, dispatch : false}
// )
