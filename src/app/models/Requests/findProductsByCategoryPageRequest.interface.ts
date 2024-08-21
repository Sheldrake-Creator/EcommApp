export interface FindProductsByCategoryPageRequest {
  categories: string;
  minPrice: number;
  maxPrice: number;
  minDiscount: number;
  brands: string;
  sort: boolean;
  veracity?: boolean;
  pageNumber: number;
  pageSize: number;
}
// Default values
const defaultFindProductsByCategoryPageRequest: FindProductsByCategoryPageRequest =
  {
    veracity: undefined,
    categories: '',
    minPrice: 0,
    maxPrice: 100000000,
    minDiscount: 0,
    brands: '',
    sort: false,
    pageNumber: 1,
    pageSize: 10,
  };

// Function to create a request with defaults
export function createFindProductsByCategoryPageRequest(
  customRequest: Partial<FindProductsByCategoryPageRequest> = {},
): FindProductsByCategoryPageRequest {
  return { ...defaultFindProductsByCategoryPageRequest, ...customRequest };
}

//? Usage example

//* const customRequest: Partial<FindProductsByCategoryPageRequest> = {
//*   colors: 'red,blue',
//*  minPrice: 100,
//* };

// * const request = createFindProductsByCategoryPageRequest(customRequest);
