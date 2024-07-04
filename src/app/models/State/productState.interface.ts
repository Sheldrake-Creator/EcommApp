import { BackendErrorsInterface } from '../Errors/backendErrors.interface';
import { ProductInterface } from '../Product/product.interface';

export interface ProductStateInterface {
  isSubmitting: boolean;
  product: ProductInterface | undefined;
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
}
