import {
  CHANGE_THE_ORDER_CONSTRUCTOR_INGREDIENTS,
  CONSTRUCTOR_BUNS,
  CONSTRUCTOR_INGREDIENTS,
  ORDER_INGREDIENTS,
  REMOVE_ELEMENT,
  RESET_CONSTRUCTOR,
} from "../actions/constructor";

const initialState = {
  orderIngredients: [],
  constructorIngredients: [],
  constructorBuns: {},
};

export const constructorReducer = (state = initialState, action) => {
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
          ...state.constructorIngredients,
          action.payload,
        ],
      };
    case CONSTRUCTOR_BUNS:
      return {
        ...state,
        constructorBuns: action.payload,
      };
    case REMOVE_ELEMENT:
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients].filter(
          ({ _id }) => _id !== action.payload
        ),
      };
    case RESET_CONSTRUCTOR:
      return {
        ...state,
        constructorIngredients: [],
        constructorBuns: {},
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
