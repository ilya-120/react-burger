import { Action, ActionCreator, combineReducers, Dispatch } from "redux";
import { constructorReducer } from "./constructor";
import { ingredientsReducer } from "./ingredients";
import { modalIngredientReducer } from "./modalIngredient";
import { orderReducer } from "./orders";
import { modalOrderReducer } from "./modalOrder";
import { userReducer } from "./user";
import { store } from "../..";
import { TIngredientsActions } from "../actions/typeIngredientsAction";
import { TOrderActions } from "../actions/typeOrderAction";
import { ThunkAction } from "redux-thunk";
import { TConstructorActions } from "../actions/typeConstructorAction";
import { TModalActions } from "../actions/typeModalIngredientAction";
import { TModalOrderActions } from "../actions/typeModalOrderAction";
import { TUserActions } from "../actions/typeUserAction";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orderNumber: orderReducer,
  constructorBurger: constructorReducer,
  modalIngredient: modalIngredientReducer,
  modalOrder: modalOrderReducer,
  userData: userReducer,
});

export type RootState = ReturnType<typeof store.getState>;
type TApplicationActions =
  | TIngredientsActions
  | TOrderActions
  | TUserActions
  | TModalOrderActions
  | TModalActions
  | TConstructorActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = Dispatch<TApplicationActions>;
