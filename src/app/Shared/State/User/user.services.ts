import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppState } from "../AppState";
import { Store } from "@ngrx/store";
import { Observable, map, of, tap } from "rxjs";
import { UserRequestInterface } from "./Types/userRequest.interface";
import { CurrentUserInterface } from "../Auth/Types/currentUser.interface";
import { UserResponseInterface } from "./Types/userResponse.interface";
// import { logOutSuccess} from "../Auth/auth.actions";
import * as userActions from "./user.actions";




@Injectable({
    providedIn: 'root',
})

export class UserService {
    [x: string]: any;

    private apiUrl = 'https://api.realworld.io/api' + "/api";

    constructor(
        private http: HttpClient,
        private store: Store) { }

    getUserProfile(): Observable<CurrentUserInterface> {
        return this.http.get<UserResponseInterface>(this.apiUrl + '/users')
            .pipe(
                tap(response => console.log(response.user)),
                map(response => response.user)
            );



    }

}

// .get<UserResponseInterface>(`${this.apiUrl}/users/profile`, data)
// .pipe(map((response)=> response.user)) 