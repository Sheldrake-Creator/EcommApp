export interface FindProductsByCategoryRequest {
  colors: string | never[];
  sizes: string[];
  minPrice?: number;
  maxPrice?: number;
  minDiscount: number;
  category: string | null;
  stock: number | null;
  sort?: number;
  pageNumber: number;
  pageSize: number;
}
