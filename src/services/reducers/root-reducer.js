import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { ingredientReducer } from './ingredient';
import { orderReducer } from './order';
import { userReducer } from './user';
import { feedReducer } from './socket';
import { userOrdersSocketReducer } from './user-orders-socket';
import { selectedFeedReducer } from './selected-feed';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: ingredientReducer,
  order: orderReducer,
  selectedOrder: selectedFeedReducer,
  user: userReducer,
  feed: feedReducer,
  userFeed: userOrdersSocketReducer,
});
