import { BackendErrorsInterface } from "../../../ErrorHandling/BackendErrors/Types/backendErrors.interface";

export interface CartStateInterface{
    cartItems: any[];
    isLoading: boolean;
    validationErrors: BackendErrorsInterface | null;
    cart:any;
}
