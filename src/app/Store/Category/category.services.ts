import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponseInterface } from '../../models/Responses/httpResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryServices {
  API_URL = 'http://localhost:4545/';

  constructor(private http: HttpClient) {}

  //******* CATEGORY SERVICES *******//

  getCategoriesByLevel(level: number): Observable<HttpResponseInterface> {
    return this.http.post<HttpResponseInterface>(
      `${this.API_URL}api/category/level`,
      level,
    );
  }
}
