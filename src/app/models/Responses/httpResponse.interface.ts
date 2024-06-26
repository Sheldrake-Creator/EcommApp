import { HttpStatusCode } from '@angular/common/http';
import { BackendErrorsInterface } from '../Errors/backendErrors.interface';

export interface HttpResponseInterface {
  timeStamp: string;
  statusCode: number;
  status: HttpStatusCode;
  reason: string;
  message: BackendErrorsInterface;
  developerMessage?: string;
  data: { [key: string]: any };
}
