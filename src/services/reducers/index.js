import { combineReducers } from "redux";
import { constructorReducer } from "./constructor";
import { ingredientsReducer } from "./ingredients";
import { modalIngredientReducer } from "./modalIngredient";
import { orderReducer } from "./orders";
import { modalOrderReducer } from "./modalOrder";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orderNumber: orderReducer,
  constructorBurger: constructorReducer,
  modalIngredient: modalIngredientReducer,
  modalOrder: modalOrderReducer,
});
