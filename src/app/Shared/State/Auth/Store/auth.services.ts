import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, map } from "rxjs";
import { AuthResponseInterface } from "../Types/authResponse.interface";
import { CurrentUserInterface } from "../Types/currentUser.interface";
import { LoginRequestInterface } from "../Types/loginRequest.interface";
import { LogoutRequestInterface } from "../Types/logoutRequest.interface";
import { RegisterRequestInterface } from "../Types/registerRequest.interface";


@Injectable({
    providedIn: 'root',
})

export class AuthService {

    // private apiUrl = 'https://api.realworld.io/api';
    private apiUrl = 'http://localhost:4545';
    constructor(
        private http: HttpClient, 
        private store: Store) { }


    register(data:RegisterRequestInterface):Observable<CurrentUserInterface>{
        return this.http
        .post<AuthResponseInterface>(this.apiUrl + '/register',data).pipe(map((response)=>response.user))
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