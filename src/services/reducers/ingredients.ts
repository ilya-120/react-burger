import { constants } from "../../utils/data";
import { TIngredient } from "../../utils/typeData";
import {
  ERROR_TEXT_GET_INGREDIENTS,
  GET_INGREDIENTS,
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

export const initialState: TInitialState = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  success: false,
  errorText: null,
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TInitialState => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
        buns: action.payload.filter((item) => item.type === constants.bun),
        mains: action.payload.filter((item) => item.type === constants.main),
        sauces: action.payload.filter((item) => item.type === constants.sauce),
        success: true,
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
