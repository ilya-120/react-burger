import { TIngredient } from "../../utils/typeData";
import {
  ORDER_INGREDIENTS,
  CONSTRUCTOR_INGREDIENTS,
  CONSTRUCTOR_BUNS,
  CHANGE_THE_ORDER_CONSTRUCTOR_INGREDIENTS,
  REMOVE_ELEMENT,
  RESET_CONSTRUCTOR,
} from "./constructor";

interface IOrderIngredients {
  payload: string[] | null;
  readonly type: typeof ORDER_INGREDIENTS;
}

interface IConstructorIngredients {
  payload: TIngredient;
  readonly type: typeof CONSTRUCTOR_INGREDIENTS;
}

interface IConstructorBuns {
  payload: TIngredient | null;
  readonly type: typeof CONSTRUCTOR_BUNS;
}

interface IRemoveElement {
  payload: string;
  readonly type: typeof REMOVE_ELEMENT;
}

interface IResetConstructor {
  readonly type: typeof RESET_CONSTRUCTOR;
}

interface IChangeTheOrderConstructorIngredients {
  payload: TIngredient[] | null;
  readonly type: typeof CHANGE_THE_ORDER_CONSTRUCTOR_INGREDIENTS;
}

export type TConstructorActions =
  | IOrderIngredients
  | IConstructorIngredients
  | IConstructorBuns
  | IRemoveElement
  | IResetConstructor
  | IChangeTheOrderConstructorIngredients
