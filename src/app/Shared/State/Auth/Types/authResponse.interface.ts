import { CurrentUserInterface } from "./currentUser.interface";

export interface AuthResponseInterface{
   userId : string
   userName : string
   token : string
   email : string
   role : string

}