import { TIngredient } from "../../utils/typeData";
import { CLOSE_SHOW_MODAL, OPEN_SHOW_MODAL } from "../actions/modalIngredient";
import { TModalActions } from "../actions/typeModalIngredientAction";

type TInitialState = {
  showModal: boolean;
  modalIngredientsDetails: TIngredient;
};

const initialState: TInitialState = {
  showModal: false,
  modalIngredientsDetails: {} as TIngredient,
};

export const modalIngredientReducer = (
  state = initialState,
  action: TModalActions
) => {
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
