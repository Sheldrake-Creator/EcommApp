import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppState } from "../AppState";
import { Store } from "@ngrx/store";
import { Observable, catchError, map, of, tap } from "rxjs";
import { UserRequestInterface } from "./Types/userRequest.interface";
import { CurrentUserInterface } from "../Auth/Types/currentUser.interface";
import { UserResponseInterface } from "./Types/userResponse.interface";
// import { logOutSuccess} from "../Auth/auth.actions";
import * as userActions from "./user.actions";
import { UserInterface } from "./Types/user.interface";
import { RegisterRequestInterface } from "../Auth/Types/registerRequest.interface";
import { AuthResponseInterface } from "../Auth/Types/authResponse.interface";




@Injectable({
    providedIn: 'root',
})

export class UserService {


    private apiUrl = 'http://localhost:4545' + "/api/users";

    constructor(
        private http: HttpClient,
        private store: Store) { }

    // getUserProfileFromBackend(data: UserRequestInterface): Observable<CurrentUserInterface> {
    //     return this.http.post<UserResponseInterface>(this.apiUrl + '/login',data)
    //         .pipe(
    //             tap(response => console.log(response.user)),
    //             map(response => response.user)
    //         );

    // }
    onRegister(data: RegisterRequestInterface):Observable<CurrentUserInterface> {
        return this.http
        .post<UserResponseInterface>(this.apiUrl + '/register',data).pipe(
        map((response)=>response.user))

    }

}

// .get<UserResponseInterface>(`${this.apiUrl}/users/profile`, data)
// .pipe(map((response)=> response.user)) 