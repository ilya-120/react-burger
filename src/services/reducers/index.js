import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./orders";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orderNumber: orderReducer,
});
