import { GET_INGREDIENTS } from "../actions";

const initialState = {
  buns: [],
  mains: [],
  sauces: [],
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return {
        ...state,
        buns: action.payload.filter((item) => item.type === "bun"),
        mains: action.payload.filter((item) => item.type === "main"),
        sauces: action.payload.filter((item) => item.type === "sauce"),
      };
    default:
      return state;
  }
};
