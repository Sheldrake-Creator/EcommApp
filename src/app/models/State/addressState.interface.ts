import { AddressInterface } from '../Address/address.interface';
import { BackendErrorsInterface } from '../Errors/backendErrors.interface';

export interface AddressStateInterface {
  currentUserAddresses: AddressInterface[] | undefined;
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
}
