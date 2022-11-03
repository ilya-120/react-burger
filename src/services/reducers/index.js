import { combineReducers } from "redux";
import { constructorReducer } from "./constructor";
import { ingredientsReducer } from "./ingredients";
import { modalIngredientReducer } from "./modalIngredient";
import { orderReducer } from "./orders";
import { modalOrderReducer } from "./modalOrder";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orderNumber: orderReducer,
  constructorBurger: constructorReducer,
  modalIngredient: modalIngredientReducer,
  modalOrder: modalOrderReducer,
  userData: userReducer,
});
