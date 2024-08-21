import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductInterface } from '../../models/Product/product.interface';
import { CreateProductRequestInterface } from '../../models/Requests/createProductRequest';
import { FindProductsByCategoryPageRequest } from '../../models/Requests/findProductsByCategoryPageRequest.interface';
import { QueryParams } from '../../models/Requests/QueryParams.interface';
import { HttpResponseInterface } from '../../models/Responses/httpResponse.interface';
import { HttpResponsePaginatedInterface } from '../../models/Responses/httpResponsePaginated.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  //******* PRODUCT SERVICES *******//

  findProductsById(productId: number): Observable<HttpResponseInterface> {
    return this.http.get<HttpResponseInterface>(
      `${this.API_URL}/api/products/id/${productId}`,
    );
  }

  findProductsByCategory(
    reqData: QueryParams,
  ): Observable<HttpResponseInterface> {
    return this.http.get<HttpResponseInterface>(
      `${this.API_URL}/api/products`,
      { params: reqData },
    );
  }

  findProductsByCategoryPage(
    reqData: FindProductsByCategoryPageRequest,
  ): Observable<HttpResponseInterface> {
    const {
      categories,
      minPrice,
      maxPrice,
      minDiscount,
      brands,
      sort,
      pageNumber,
      pageSize,
    } = reqData;

    let params = new HttpParams()
      .set('categories', categories)
      .set('minPrice', minPrice)
      .set('maxPrice', maxPrice)
      .set('minDiscount', minDiscount)
      .set('brands', brands)
      .set('sort', sort)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    return this.http.get<HttpResponseInterface>(
      `${this.API_URL}/api/products`,
      { params },
    );
  }

  //******* PRODUCT ADMIN SERVICES *******//
  addProducts(
    product: CreateProductRequestInterface,
  ): Observable<HttpResponseInterface> {
    return this.http.post<HttpResponseInterface>(
      `${this.API_URL}/api/admin/products/`,
      product,
    );
  }
  getAllProducts(): Observable<HttpResponseInterface> {
    return this.http.get<HttpResponseInterface>(
      `${this.API_URL}/api/admin/products/all`,
    );
  }
  addMultipleProducts(
    productList: CreateProductRequestInterface[],
  ): Observable<HttpResponseInterface> {
    return this.http.post<HttpResponseInterface>(
      `${this.API_URL}/api/admin/products/creates`,
      productList,
    );
  }
  updateProduct(
    productId: number,
    product: ProductInterface[],
  ): Observable<HttpResponseInterface> {
    return this.http.put<HttpResponseInterface>(
      `${this.API_URL}/api/admin/products/id/${productId}/update`,
      product,
    );
  }
  deleteProduct(productId: number): Observable<HttpResponseInterface> {
    return this.http.delete<HttpResponseInterface>(
      `${this.API_URL}/api/admin/products/id/${productId}/delete`,
    );
  }
  getAllProductsPaginated(
    page: number,
  ): Observable<HttpResponsePaginatedInterface> {
    return this.http.get<HttpResponsePaginatedInterface>(
      `${this.API_URL}/api/products/all/${page}`,
    );
  }
  singleCategorySearch(
    params1: string,
    params2: string,
    params3: string,
  ): Observable<HttpResponseInterface> {
    return this.http.get<HttpResponseInterface>(
      `${this.API_URL}/api/${params1}/${params2}/${params3}`,
    );
  }
}
