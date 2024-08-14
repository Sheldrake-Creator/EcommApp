import { ProductInterface } from '../Product/product.interface';

export interface ProductPageInterface {
  content: ProductInterface[]; // The actual products
  pageable: PageableInterface;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: SortInterface; // Reusing the same sort interface
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface PageableInterface {
  pageNumber: number;
  pageSize: number;
  sort: SortInterface;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface SortInterface {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}
