import { AddressInterface } from '../Address/address.interface';

export interface CurrentUserInterface {
  userId: string;
  email: string;
  token: string | null;
  userName: string;
  role: string | null;
  addresses: AddressInterface[];
}
