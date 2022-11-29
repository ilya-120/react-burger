import {
  CLOSE_SHOW_MODAL_ORDER_NUMBER,
  OPEN_SHOW_MODAL_ORDER_NUMBER,
} from "../actions/modalOrder";
import { TModalOrderActions } from "../actions/typeModalOrderAction";

type TInitialState = {
  showModal: boolean;
};

const initialState: TInitialState = {
  showModal: false,
};

export const modalOrderReducer = (
  state = initialState,
  action: TModalOrderActions
): TInitialState => {
  switch (action.type) {
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
