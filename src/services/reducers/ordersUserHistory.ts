import { PayloadAction } from "@reduxjs/toolkit";
import { TWSData } from "../../utils/typeData";
import { TWSUserOrdersHistoryActions } from "../actions/typeWsUserOrdersHistoryAction";
import {
  WS_USER_ORDERS_HISTORY_CLOSE,
  WS_USER_ORDERS_HISTORY_GET_MESSAGE,
  WS_USER_ORDERS_HISTORY_OPEN,
  WS_USER_ORDERS_HISTORY_ERROR
} from "../actions/ws";

type TInitialState = {
  wsConnected: boolean;
  data: TWSData;
  error?: PayloadAction | null;
};

const initialState: TInitialState = {
  wsConnected: false,
  data: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0
  },
};

export const ordersUserHistoryReducer = (
  state = initialState,
  action: TWSUserOrdersHistoryActions
): TInitialState => {
  switch (action.type) {
    case WS_USER_ORDERS_HISTORY_OPEN:
      return {
        ...state,
        wsConnected: true,
      };
    case WS_USER_ORDERS_HISTORY_ERROR:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_USER_ORDERS_HISTORY_CLOSE:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_USER_ORDERS_HISTORY_GET_MESSAGE:
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
