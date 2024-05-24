import { BackendErrorsInterface } from "../../../ErrorHandling/BackendErrors/Types/backendErrors.interface"
import { CurrentUserInterface } from "./currentUser.interface"

export interface LogoutRequestInterface{
    user:{
        token:string
    }
}