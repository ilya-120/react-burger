import { PayloadAction } from "@reduxjs/toolkit";
import { TWSData } from "../../utils/typeData";
import { TWSOrdersHistoryActions } from "../actions/typeWsOrdersHistoryAction";
import {
  WS_ORDERS_HISTORY_ERROR,
  WS_ORDERS_HISTORY_CLOSE,
  WS_ORDERS_HISTORY_GET_MESSAGE,
  WS_ORDERS_HISTORY_OPEN,
} from "../actions/ws";

type TInitialState = {
  wsConnected: boolean;
  data: TWSData;
  error?: PayloadAction | null;
};

export const initialState: TInitialState = {
  wsConnected: false,
  data: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

export const ordersHistoryReducer = (
  state = initialState,
  action: TWSOrdersHistoryActions
): TInitialState => {
  switch (action.type) {
    case WS_ORDERS_HISTORY_OPEN:
      return {
        ...state,
        wsConnected: true,
      };
    case WS_ORDERS_HISTORY_ERROR:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_ORDERS_HISTORY_CLOSE:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_ORDERS_HISTORY_GET_MESSAGE:
      return {
        ...state,
        data: {
          ...state.data,
          success: true,
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
        },
      };
    default:
      return state;
  }
};
