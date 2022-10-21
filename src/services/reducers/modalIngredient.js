import { CLOSE_SHOW_MODAL, OPEN_SHOW_MODAL } from "../actions/modalIngredient";

const initialState = {
  showModal: false,
  modalIngredientsDetails: {},
};

export const modalIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
