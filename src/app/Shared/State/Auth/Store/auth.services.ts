import { HttpClient } from "@angular/common/http";
import { AuthResponseInterface } from "../Types/authResponse.interface";
import { CurrentUserInterface } from "../Types/currentUser.interface";
import { RegisterRequestInterface } from "../Types/registerRequest.interface";
import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { LoginRequestInterface } from "../Types/loginRequest.interface";
import { LogoutRequestInterface } from "../Types/logoutRequest.interface";


@Injectable({
    providedIn: 'root',
})

export class AuthService {

    private apiUrl = 'https://api.realworld.io/api';
    constructor(
        private http: HttpClient, 
        private store: Store) { }


    register(data:RegisterRequestInterface):Observable<CurrentUserInterface>{
        return this.http
        .post<AuthResponseInterface>(this.apiUrl + '/users',data).pipe(map((response)=>response.user))
    }
    login(data:LoginRequestInterface):Observable<CurrentUserInterface>{
        return this.http
        .post<AuthResponseInterface>(this.apiUrl + '/users/login',data)
        .pipe(map((response) => response.user))
    }
    logout(data:LogoutRequestInterface){
        localStorage.removeItem(data.user.token);
    }


}