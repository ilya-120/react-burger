import * as types from "../actions/orders";
import { orderReducer, initialState } from "./orders";

describe("orderReducer", () => {
  it("should return the initial state", () => {
    expect(orderReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SUCCESS_GET_ORDER_NUMBER", () => {
    expect(
      orderReducer(initialState, { type: types.SUCCESS_GET_ORDER_NUMBER })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        success: true,
        error: false,
      })
    );
  });

  it("should handle GET_ORDER_NUMBER", () => {
    const payload = 1
    expect(
      orderReducer(initialState, {
        type: types.GET_ORDER_NUMBER,
        payload
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        orderNumber: payload,
      })
    );
  });

  it("should handle ERROR_TEXT_GET_ORDER_NUMBER", () => {
    const payload = 'Ошибка'
    expect(
      orderReducer(initialState, {
        type: types.ERROR_TEXT_GET_ORDER_NUMBER,
        payload
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        errorText: payload,
        error: true,
      })
    );
  });

  it("should handle RESET_OLD_ORDER_DATA", () => {
    expect(orderReducer(initialState, { type: types.RESET_OLD_ORDER_DATA })).toEqual(
      expect.objectContaining({
        ...initialState,
        success: false,
        error: false,
        errorText: "",
        orderNumber: null,
      })
    );
  });
});
