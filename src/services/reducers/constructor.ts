import {
  CHANGE_THE_ORDER_CONSTRUCTOR_INGREDIENTS,
  CONSTRUCTOR_BUNS,
  CONSTRUCTOR_INGREDIENTS,
  ORDER_INGREDIENTS,
  REMOVE_ELEMENT,
  RESET_CONSTRUCTOR,
} from "../actions/constructor";
import { TIngredient } from "../../utils/typeData";
import { TConstructorActions } from "../actions/typeConstructorAction";

type TInitialState = {
  orderIngredients: string[] | null;
  constructorIngredients: TIngredient[] | null;
  constructorBuns: TIngredient;
};

const initialState: TInitialState = {
  orderIngredients: [],
  constructorIngredients: [],
  constructorBuns: {} as TIngredient,
};

export const constructorReducer = (
  state = initialState,
  action: TConstructorActions
): TInitialState => {
  switch (action.type) {
    case ORDER_INGREDIENTS:
      return {
        ...state,
        orderIngredients: action.payload,
      };
    case CONSTRUCTOR_INGREDIENTS:
      return {
        ...state,
        constructorIngredients: [
          ...(state.constructorIngredients as TIngredient[]),
          action.payload,
        ],
      };
    case CONSTRUCTOR_BUNS:
      return {
        ...state,
        constructorBuns: action.payload as TIngredient,
      };
    case REMOVE_ELEMENT:
      return {
        ...state,
        constructorIngredients: [
          ...(state.constructorIngredients as TIngredient[]),
        ].filter(({ _id }) => _id !== action.payload),
      };
    case RESET_CONSTRUCTOR:
      return {
        ...state,
        constructorIngredients: [],
        constructorBuns: {} as TIngredient,
      };
    case CHANGE_THE_ORDER_CONSTRUCTOR_INGREDIENTS:
      return {
        ...state,
        constructorIngredients: action.payload,
      };
    default:
      return state;
  }
};
