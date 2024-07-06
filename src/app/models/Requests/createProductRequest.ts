import { ProductInterface } from '../Product/product.interface';
import { SizesInterface } from '../Product/size.interface';
import { RatingsInterface } from '../Ratings/ratings.interface';
import { ReviewsInterface } from '../Reviews/reviews.interface';

export interface CreateProductRequestInterface {
  productId?: number;
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
