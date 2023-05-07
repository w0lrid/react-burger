import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { ingredientReducer } from "./ingredient";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredient: ingredientReducer,
})