import {
  ERROR_TEXT_GET_INGREDIENTS,
  GET_INGREDIENTS,
  SUCCESS_GET_INGREDIENTS,
} from "../actions/ingredients";

const initialState = {
  buns: [],
  mains: [],
  sauces: [],
  success: false,
  errorText: null,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_GET_INGREDIENTS:
      return {
        ...state,
        success: true,
      };
    case GET_INGREDIENTS:
      return {
        ...state,
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
