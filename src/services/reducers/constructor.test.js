import * as types from "../actions/constructor";
import { constructorReducer, initialState } from "./constructor";

describe("constructorReducer", () => {
  it("should return the initial state", () => {
    expect(constructorReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ORDER_INGREDIENTS", () => {
    const payload = [];
    expect(
      constructorReducer(initialState, {
        type: types.ORDER_INGREDIENTS,
        payload,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        orderIngredients: payload,
      })
    );
  });

  it("should handle CONSTRUCTOR_INGREDIENTS", () => {
    const payload = [];
    expect(
      constructorReducer(initialState, {
        type: types.CONSTRUCTOR_INGREDIENTS,
        payload,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        constructorIngredients: [
          ...initialState.constructorIngredients,
          payload,
        ],
      })
    );
  });

  it("should handle CONSTRUCTOR_BUNS", () => {
    const payload = {};
    expect(
      constructorReducer(initialState, {
        type: types.CONSTRUCTOR_BUNS,
        payload,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        constructorBuns: payload,
      })
    );
  });

  it("should handle REMOVE_ELEMENT", () => {
    const payload = { _id: "1234567890" };
    expect(
      constructorReducer(initialState, {
        type: types.REMOVE_ELEMENT,
        payload,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        constructorIngredients: [...initialState.constructorIngredients].filter(
          ({ _id }) => _id !== payload
        ),
      })
    );
  });

  it("should handle RESET_CONSTRUCTOR", () => {
    expect(
      constructorReducer(initialState, {
        type: types.RESET_CONSTRUCTOR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        constructorIngredients: [],
        constructorBuns: {}
      })
    );
  });

  it("should handle CHANGE_THE_ORDER_CONSTRUCTOR_INGREDIENTS", () => {
    const payload = [];
    expect(
      constructorReducer(initialState, {
        type: types.CHANGE_THE_ORDER_CONSTRUCTOR_INGREDIENTS,
        payload,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        constructorIngredients: payload,
      })
    );
  });
});
