export interface FindProductsByCategoryRequest {
  colors: string;
  sizes: string;
  minPrice: number;
  maxPrice: number;
  minDiscount: number;
  category: string | null;
  stock: number;
  sort: boolean;
  pageNumber: number;
  pageSize: number;
}
