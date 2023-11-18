import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { ingredientReducer } from './ingredient';
import { orderReducer } from './order';
import { userReducer } from './user';
import { socketReducer } from './socket';
import { userOrdersSocketReducer } from './user-orders-socket';
import { selectedFeedReducer } from './selectedFeed';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: ingredientReducer,
  order: orderReducer,
  user: userReducer,
  socket: socketReducer,
  userOrders: userOrdersSocketReducer,
  feed: selectedFeedReducer,
});
