import * as types from "../actions/ingredients";
import { ingredientsReducer } from "./ingredients";

const initialState = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  success: false,
  errorText: null,
};

describe("ingredientsReducer", () => {
  it("should return the initial state", () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_INGREDIENTS", () => {
    const payload = [];
    expect(
      ingredientsReducer(initialState, {
        type: types.GET_INGREDIENTS,
        payload,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        ingredients: payload,
        buns: payload,
        mains: payload,
        sauces: payload,
        success: true,
      })
    );
  });

  it("should handle ERROR_TEXT_GET_INGREDIENTS", () => {
    const payload = "Ошибка";
    expect(
      ingredientsReducer(initialState, {
        type: types.ERROR_TEXT_GET_INGREDIENTS,
        payload,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        errorText: payload,
      })
    );
  });
});
