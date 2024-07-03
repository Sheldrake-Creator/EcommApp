import { ProductInterface } from '../Product/product.interface';

export interface CartItemInterface {
  product: ProductInterface;
  cartItemId: number;
  size: string;
  quantity: number;
  price: number;
  discountedPrice: number;
  cartId: number;
}
