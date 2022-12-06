import { TIngredient } from "../../utils/typeData";
import {
  ERROR_TEXT_GET_INGREDIENTS,
  GET_INGREDIENTS,
} from "./ingredients";

export interface IErrorTextGetIngredients {
  payload: string | null;
  readonly type: typeof ERROR_TEXT_GET_INGREDIENTS;
}

export interface IGetIngredients {
  payload: TIngredient[];
  readonly type: typeof GET_INGREDIENTS;
}

export type TIngredientsActions =
  | IErrorTextGetIngredients
  | IGetIngredients
