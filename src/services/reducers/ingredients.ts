import { TIngredient } from "../../utils/typeData";
import {
  ERROR_TEXT_GET_INGREDIENTS,
  GET_INGREDIENTS,
  SUCCESS_GET_INGREDIENTS,
} from "../actions/ingredients";
import { TIngredientsActions } from "../actions/typeIngredientsAction";

type TInitialState = {
  ingredients: TIngredient[],
  buns: TIngredient[],
  mains: TIngredient[],
  sauces: TIngredient[],
  success: boolean,
  errorText: string | null,
};

const initialState: TInitialState = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  success: false,
  errorText: null,
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TInitialState => {
  switch (action.type) {
    case SUCCESS_GET_INGREDIENTS:
      return {
        ...state,
        success: true,
      };
    case GET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
        buns: action.payload.filter((item) => item.type === "bun"),
        mains: action.payload.filter((item) => item.type === "main"),
        sauces: action.payload.filter((item) => item.type === "sauce"),
      };
    case ERROR_TEXT_GET_INGREDIENTS:
      return {
        ...state,
        errorText: action.payload,
      };
    default:
      return state;
  }
};
