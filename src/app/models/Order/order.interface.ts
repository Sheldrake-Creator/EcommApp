import { SizesInterface } from '../Product/size.interface';

export interface OrderInterface {
  productId: number;
  title: string;
  description: string;
  price: number;
  discountedPrice?: number;
  numInStock: number;
  brand: string;
  color: string;
  sizes?: SizesInterface[];
  imageUrl: string;
  // ratings?: RatingsInterface[];
  // reviews?: ReviewsInterface[];
  numRatings: number | null;
  firstLevelCategory?: string | null;
  secondLevelCategory?: string | null;
  thirdLevelCategory?: string | null;
}
