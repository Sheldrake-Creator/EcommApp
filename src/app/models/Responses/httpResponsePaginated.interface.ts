import { HttpStatusCode } from '@angular/common/http';
import { BackendErrorsInterface } from '../Errors/backendErrors.interface';
import { ProductInterface } from '../Product/product.interface';
import { SuccessMessageInterface } from './successMessage.interface';

export interface HttpResponsePaginatedInterface {
  timeStamp: string;
  statusCode: number;
  status: HttpStatusCode;
  reason: string;
  message: BackendErrorsInterface | SuccessMessageInterface;
  developerMessage?: string;
  data: {
    content: ProductInterface[]; // Assuming ProductInterface is the interface for your product DTOs
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
  };
}
