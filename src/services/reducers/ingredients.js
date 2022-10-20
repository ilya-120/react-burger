import {
  CHANGE_THE_ORDER_CONSTRUCTOR_INGREDIENTS,
  CLOSE_SHOW_MODAL,
  CONSTRUCTOR_BUNS,
  CONSTRUCTOR_INGREDIENTS,
  ERROR_TEXT_GET_INGREDIENTS,
  GET_INGREDIENTS,
  OPEN_SHOW_MODAL,
  ORDER_INGREDIENTS,
  REMOVE_ELEMENT,
  RESET_CONSTRUCTOR,
  SUCCESS_GET_INGREDIENTS,
} from "../actions";

const initialState = {
  buns: [],
  mains: [],
  sauces: [],
  success: false,
  error: false,
  errorText: "",
  orderIngredients: [],
  constructorIngredients: [],
  constructorBuns: {},
  showModal: false,
  modalIngredientsDetails: {},
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_GET_INGREDIENTS:
      return {
        ...state,
        success: true,
        error: false,
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
        error: true,
      };
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
    case OPEN_SHOW_MODAL:
      return {
        ...state,
        modalIngredientsDetails: action.payload,
        showModal: true,
      };
    case CLOSE_SHOW_MODAL:
      return {
        ...state,
        modalIngredientsDetails: {},
        showModal: false,
      };
      case CHANGE_THE_ORDER_CONSTRUCTOR_INGREDIENTS:
      return {
        ...state,
        constructorIngredients:  action.payload,
      };
    default:
      return state;
  }
};
