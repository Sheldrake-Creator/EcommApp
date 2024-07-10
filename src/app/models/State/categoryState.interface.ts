import { CategoryInterface } from '../Category/category.interface';
import { BackendErrorsInterface } from '../Errors/backendErrors.interface';

export interface CategoryStateInterface {
  // cartItems: CartItemInterface[];
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
  categories: CategoryInterface[] | undefined;
}
