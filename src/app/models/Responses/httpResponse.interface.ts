import { HttpStatusCode } from '@angular/common/http';
import { BackendErrorsInterface } from '../Errors/backendErrors.interface';
import { SuccessMessageInterface } from './successMessage.interface';

export interface HttpResponseInterface {
  timeStamp: string;
  statusCode: number;
  status: HttpStatusCode;
  reason: string;
  message: BackendErrorsInterface | SuccessMessageInterface;
  developerMessage?: string;
  data: { [key: string]: any };
}
