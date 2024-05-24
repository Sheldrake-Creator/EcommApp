import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../Types/authState.interface";
import { authActions, logout} from "./auth.actions";

const initialState:AuthStateInterface = {
    isSubmitting: false,
    isLoading : false,
    currentUser: undefined,
    validationErrors:null,
}
//Adjust these to call the backend Server
const authFeature = createFeature({
    name: 'auth',
    reducer:createReducer(
        initialState,
        on(authActions.register,(state) => ({
            ...state, 
            isSubmitting:true, 
            validationErrors: null
        })),
        on(authActions.registerSuccess,(state, action) => ({
            ...state, 
            isSubmitting:false, 
            currentUser: action.currentUser,
        })),
        on(authActions.registerFailure,(state, action) => ({
            ...state, 
            isSubmitting:false, 
            validationErrors: action.errors,
        })),
        on(authActions.login,(state) =>({
            ...state,
            isSubmitting: true,
            validationErrors:null,
        })),
        on(authActions.loginSuccess,(state, action) => ({
            ...state, 
            isSubmitting:false, 
            currentUser: action.currentUser,
        })),
        on(authActions.loginFailure,(state, action) => ({
            ...state, 
            isSubmitting:false, 
            validationErrors: action.errors,
        })),
        on(logout,(state) =>({
            ...state,
            isSubmitting:false, 
            currentUser: null,
            validationErrors: null
        }))
    )
})

export const{
    name:authFeatureKey, 
    reducer: authReducer,
    selectIsSubmitting,
    selectCurrentUser,
    selectIsLoading,
    selectValidationErrors,

}= authFeature