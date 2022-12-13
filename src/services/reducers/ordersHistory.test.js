import * as types from "../actions/ws";
import { ordersHistoryReducer } from "./ordersHistory";

const initialState = {
  wsConnected: false,
  data: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

describe("ordersHistoryReducer", () => {
  it("should return the initial state", () => {
    expect(ordersHistoryReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle WS_ORDERS_HISTORY_OPEN", () => {
    expect(
      ordersHistoryReducer(initialState, { type: types.WS_ORDERS_HISTORY_OPEN })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        wsConnected: true,
      })
    );
  });

  it("should handle WS_ORDERS_HISTORY_ERROR", () => {
    expect(
      ordersHistoryReducer(initialState, {
        type: types.WS_ORDERS_HISTORY_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        wsConnected: false,
      })
    );
  });

  it("should handle WS_ORDERS_HISTORY_CLOSE", () => {
    expect(
      ordersHistoryReducer(initialState, {
        type: types.WS_ORDERS_HISTORY_CLOSE,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        wsConnected: false,
      })
    );
  });

  it("should handle WS_ORDERS_HISTORY_GET_MESSAGE", () => {
    const payload = {
      data: {
        success: true,
        orders: [],
        total: 1,
        totalToday: 1,
      },
    };
    expect(
      ordersHistoryReducer(initialState, {
        type: types.WS_ORDERS_HISTORY_GET_MESSAGE,
        payload,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialState,
        data: {
          ...initialState.data,
          success: true,
          orders: payload.orders,
          total: payload.total,
          totalToday: payload.totalToday,
        },
      })
    );
  });
});
