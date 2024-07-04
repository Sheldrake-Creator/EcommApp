export interface FindProductsByCategoryRequest {
  colors: string;
  sizes: string;
  minPrice: number;
  maxPrice: number;
  minDiscount: number;
  category: string;
  stock: number;
  sort: number;
  pageNumber: number;
  pageSize: string;
}
