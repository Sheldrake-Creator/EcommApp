import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ProductInterface } from '../../models/Product/product.interface';
import { CreateProductRequestInterface } from '../../models/Requests/createProductRequest';
import { FindProductsByCategoryRequest } from '../../models/Requests/findProductsByCategoryRequest.interface';
import { HttpResponseInterface } from '../../models/Responses/httpResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  //******* PRODUCT SERVICES *******//

  findProductsById(productId: number): Observable<HttpResponseInterface> {
    return this.http.get<HttpResponseInterface>(
      `${this.API_URL}api/products/id/${productId}`,
    );
  }

  findProductsByCategory(
    reqData: FindProductsByCategoryRequest,
  ): Observable<HttpResponseInterface> {
    const {
      colors,
      sizes,
      minPrice,
      maxPrice,
      minDiscount,
      category,
      stock,
      sort,
      pageNumber,
      pageSize,
    } = reqData;

    let params = new HttpParams()
      .set('color', colors)
      .set('size', sizes)
      .set('minPrice', minPrice)
      .set('maxPrice', maxPrice)
      .set('minDiscount', minDiscount)
      .set('category', category!)
      .set('stock', stock)
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
      `${this.API_URL}api/admin/products/`,
      product,
    );
  }
  getAllProducts(): Observable<HttpResponseInterface> {
    return this.http.get<HttpResponseInterface>(
      `${this.API_URL}api/admin/products/all`,
    );
  }
  addMultipleProducts(
    productList: CreateProductRequestInterface[],
  ): Observable<HttpResponseInterface> {
    return this.http.post<HttpResponseInterface>(
      `${this.API_URL}api/admin/products/creates`,
      productList,
    );
  }
  updateProduct(
    productId: number,
    product: ProductInterface[],
  ): Observable<HttpResponseInterface> {
    return this.http.put<HttpResponseInterface>(
      `${this.API_URL}api/admin/products/id/${productId}/update`,
      product,
    );
  }
  deleteProduct(productId: number): Observable<HttpResponseInterface> {
    return this.http.delete<HttpResponseInterface>(
      `${this.API_URL}api/admin/products/id/${productId}/delete`,
    );
  }
}
