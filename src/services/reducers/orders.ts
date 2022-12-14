import {
  ERROR_TEXT_GET_ORDER_NUMBER,
  GET_ORDER_NUMBER,
  RESET_OLD_ORDER_DATA,
  SUCCESS_GET_ORDER_NUMBER,
} from "../actions/orders";
import { TOrderActions } from "../actions/typeOrderAction";

type TInitialState = {
  success: boolean;
  error: boolean;
  errorText: string | null;
  orderNumber: number | null;
};

export const initialState: TInitialState = {
  success: false,
  error: false,
  errorText: "",
  orderNumber: null,
};

export const orderReducer = (
  state = initialState,
  action: TOrderActions
): TInitialState => {
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
