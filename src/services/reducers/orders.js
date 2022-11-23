import {
  ERROR_TEXT_GET_ORDER_NUMBER,
  GET_ORDER_NUMBER,
  RESET_OLD_ORDER_DATA,
  SUCCESS_GET_ORDER_NUMBER,
} from "../actions/orders";

const initialState = {
  success: false,
  error: false,
  errorText: "",
  orderNumber: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_GET_ORDER_NUMBER:
      return {
        ...state,
        success: true,
        error: false,
      };
    case GET_ORDER_NUMBER:
      return {
        ...state,
        orderNumber: action.payload,
      };
    case ERROR_TEXT_GET_ORDER_NUMBER:
      return {
        ...state,
        errorText: action.payload,
        error: true,
      };
    case RESET_OLD_ORDER_DATA:
      return {
        ...state,
        success: false,
        error: false,
        errorText: "",
        orderNumber: null,
      };
    default:
      return state;
  }
};
