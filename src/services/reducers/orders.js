import {
  CLOSE_SHOW_MODAL_ORDER_NUMBER,
  ERROR_GET_ORDER_NUMBER,
  ERROR_TEXT_GET_ORDER_NUMBER,
  GET_ORDER_NUMBER,
  OPEN_SHOW_MODAL_ORDER_NUMBER,
  SUCCESS_GET_ORDER_NUMBER,
} from "../actions";

const initialState = {
  success: false,
  error: false,
  errorText: "",
  orderNumber: null,
  showModal: false,
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
      };
      case ERROR_GET_ORDER_NUMBER:
        return {
          ...state,
          error: true,
        };
        case OPEN_SHOW_MODAL_ORDER_NUMBER:
      return {
        ...state,
        showModal: true,
      };
    case CLOSE_SHOW_MODAL_ORDER_NUMBER:
      return {
        ...state,
        showModal: false,
      };
    default:
      return state;
  }
};
