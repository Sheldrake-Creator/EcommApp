import { BackendErrorsInterface } from "../../../ErrorHandling/BackendErrors/Types/backendErrors.interface"
import { CurrentUserInterface } from "../../Auth/Types/currentUser.interface"


export interface UserStateInterface{
    isSubmitting: boolean,
    currentUser : CurrentUserInterface | null | undefined
    isLoading : boolean
    validationErrors : BackendErrorsInterface | null
}
