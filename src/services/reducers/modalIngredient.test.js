import * as types from "../actions/modalIngredient";
import { modalIngredientReducer, initialState } from "./modalIngredient";

describe("modalIngredientReducer", () => {
  it("should return the initial state", () => {
    expect(modalIngredientReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle OPEN_SHOW_MODAL", () => {
    const payload = {test: 'test'}
    expect(
        modalIngredientReducer(initialState, {
        type: types.OPEN_SHOW_MODAL,
        payload
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        modalIngredientsDetails: payload,
        showModal: true,
      })
    );
  });

  it("should handle CLOSE_SHOW_MODAL", () => {
    expect(
        modalIngredientReducer(initialState, {
        type: types.CLOSE_SHOW_MODAL
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        showModal: false,
        modalIngredientsDetails: {}
      })
    );
  });
});
