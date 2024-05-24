import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { RegisterRequestInterface } from "../Types/registerRequest.interface";
import { CurrentUserInterface } from "../Types/currentUser.interface";
import { BackendErrorsInterface } from "../../../ErrorHandling/BackendErrors/Types/backendErrors.interface";
import { LoginRequestInterface } from "../Types/loginRequest.interface";
import { LogoutRequestInterface } from "../Types/logoutRequest.interface";



export const authActions = createActionGroup({
    source:'auth',
    events:{
        Register:props<{request : RegisterRequestInterface}>(),
        "Register success" : props<{currentUser : CurrentUserInterface}>(),
        "Register failure" : props<{errors: BackendErrorsInterface}>(),
        Login:props<{request : LoginRequestInterface}>(),
        "Login success" : props<{currentUser : CurrentUserInterface}>(),
        "Login failure" : props<{errors : BackendErrorsInterface}>(),
        //TO DO This might be a fucked way of handling this situation 
    },
})

export const logout = createAction('[auth] Logout User'
);