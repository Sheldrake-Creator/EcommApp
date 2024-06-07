export class RequestConstants {
  static API_BASE_URL = 'http://localhost:4545';
  static LOGIN_URI = '/login';
  static REGISTER_URI = '/register';

  //CART API
  static GET_CART_URI = '/api/cart/';
  static ADD_CART_ITEM_URI = '/api/item/add';
  static DELETE_CART_ITEM_URI = '/api/item';
  static UPDATE_CART_ITEM_URI = '/api/item';

  //ORDER API
  static CREATE_ORDER_URI = '/api/orders';
  static GET_ORDER_HISTORY_URI = '/api/orders/user';
  static GET_ORDER_BY_ID_URI = '/api/orders/';

  //PRODUCT API
  static FIND_PRODUCTS_BY_CATEGORY_URI = 'api/products';
  static FIND_PRODUCTS_BY_ID_URI = '/api/products/id';

  //RATINGS API
  static CREATE_RATING_URI = 'api/ratings/create';
  static GET_PRODUCT_RATING_URI = 'api/ratings/product';

  //REVIEWS API
  static CREATE_REVIEW_URI = 'api/reviews/create';
  static GET_PRODUCT_REVIEW_URI = 'api/reviews/product';

  //PROFILE API
  static GET_USER_BY_ID = 'api/users/id';
}
