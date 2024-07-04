import { BackendErrorsInterface } from '../Errors/backendErrors.interface';
import { ProductInterface } from '../Product/product.interface';

export interface ProductStateInterface {
  products: ProductInterface[] | undefined;
  product: ProductInterface | undefined;
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
}
