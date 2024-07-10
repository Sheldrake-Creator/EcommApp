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
// Default values
const defaultFindProductsByCategoryRequest: FindProductsByCategoryRequest = {
  colors: '',
  sizes: '',
  minPrice: 0,
  maxPrice: 100000000,
  minDiscount: 0,
  category: null,
  stock: 0,
  sort: false,
  pageNumber: 1,
  pageSize: 10,
};

// Function to create a request with defaults
export function createFindProductsByCategoryRequest(
  customRequest: Partial<FindProductsByCategoryRequest> = {},
): FindProductsByCategoryRequest {
  return { ...defaultFindProductsByCategoryRequest, ...customRequest };
}

//? Usage example

//* const customRequest: Partial<FindProductsByCategoryRequest> = {
//*   colors: 'red,blue',
//*  minPrice: 100,
//* };

// * const request = createFindProductsByCategoryRequest(customRequest);
