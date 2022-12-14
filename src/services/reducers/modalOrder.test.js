import * as types from "../actions/modalOrder";
import { modalOrderReducer, initialState } from "./modalOrder";

describe("modalOrderReducer", () => {
  it("should return the initial state", () => {
    expect(modalOrderReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle OPEN_SHOW_MODAL_ORDER_NUMBER", () => {
    expect(
        modalOrderReducer(initialState, {
        type: types.OPEN_SHOW_MODAL_ORDER_NUMBER
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        showModal: true,
      })
    );
  });

  it("should handle CLOSE_SHOW_MODAL_ORDER_NUMBER", () => {
    expect(
        modalOrderReducer(initialState, {
        type: types.CLOSE_SHOW_MODAL_ORDER_NUMBER
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        showModal: false,
      })
    );
  });
});
