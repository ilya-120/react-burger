import {
  CLOSE_SHOW_MODAL_ORDER_NUMBER,
  OPEN_SHOW_MODAL_ORDER_NUMBER,
} from "../actions/modalOrder";

const initialState = {
  showModal: false,
};

export const modalOrderReducer = (state = initialState, action) => {
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
