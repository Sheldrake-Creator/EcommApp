import { CurrentUserInterface } from '../../Auth/Types/currentUser.interface';

export interface Cart {
  user: CurrentUserInterface;
  CartId: string;
}
