import { createActionGroup, props } from "@ngrx/store";
import { UserRequestInterface } from "./Types/userRequest.interface";
import { CurrentUserInterface } from "../Auth/Types/currentUser.interface";
import { BackendErrorsInterface } from "../../ErrorHandling/BackendErrors/Types/backendErrors.interface";


export const userActions = createActionGroup({
    source:'user',
    events:{
        GetUserProfile:props<{request : UserRequestInterface}>(),
        "GetUserProfile success" : props<{currentUser : CurrentUserInterface}>(),
        "GetUserProfile failure" : props<{errors: BackendErrorsInterface}>(),
        //TO DO This might be a fucked way of handling this situation 
    },
})