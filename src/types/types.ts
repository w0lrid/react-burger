export type TUser = {};
export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  count: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};
export type TOrder = {
  _id: number;
  number: number;
  createdAt: string;
  name: string;
  ingredients: string[];
};
export type TStoreIngredients = {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredients: TIngredient[];
};
export type TStoreOrder = {
  orderRequest: boolean;
  orderFailed: boolean;
  order: any;
  selectedOrder: any;
  bun: any;
  ingredients: TIngredient[];
};
export type TStoreUser = {
  userRequest: boolean;
  userFailed: boolean;
  user: any;
};
export type TStoreFeed = {};
export type TStoreUserFeed = {};
export type TStore = {
  ingredients: TStoreIngredients;
  order: TStoreOrder;
  user: TStoreUser;
  feed: TStoreFeed;
  userFeed: TStoreUserFeed;
};
