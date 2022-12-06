import { PayloadAction } from "@reduxjs/toolkit";
import { TWSData } from "../../utils/typeData";
import {
  WS_USER_ORDERS_HISTORY_OPEN,
  WS_USER_ORDERS_HISTORY_CLOSE,
  WS_USER_ORDERS_HISTORY_GET_MESSAGE,
  WS_USER_ORDERS_HISTORY_SEND_MESSAGE,
  WS_USER_ORDERS_HISTORY_ERROR,
} from "./ws";

export const wsUserOrdersHistoryActions = {
  wsInit: WS_USER_ORDERS_HISTORY_OPEN,
  onClose: WS_USER_ORDERS_HISTORY_CLOSE,
  onMessage: WS_USER_ORDERS_HISTORY_GET_MESSAGE,
  wsSendMessage: WS_USER_ORDERS_HISTORY_SEND_MESSAGE,
  onError: WS_USER_ORDERS_HISTORY_ERROR
};

export interface IWSUserOrdersHistoryStart {
  readonly type: typeof WS_USER_ORDERS_HISTORY_OPEN;
}

export interface IWSUserOrdersHistoryClose {
  readonly type: typeof WS_USER_ORDERS_HISTORY_CLOSE;
  readonly payload: PayloadAction;
}

export interface IWSUserOrdersHistoryError {
  readonly type: typeof WS_USER_ORDERS_HISTORY_ERROR;
  readonly payload: PayloadAction;
}

export interface IWSUserOrdersHistoryGetMessage {
  readonly type: typeof WS_USER_ORDERS_HISTORY_GET_MESSAGE;
  readonly payload: TWSData;
}

export interface IWSUserOrdersHistorySendMessage {
  readonly type: typeof WS_USER_ORDERS_HISTORY_SEND_MESSAGE;
}

export type TWSUserOrdersHistoryActions =
  | IWSUserOrdersHistoryStart
  | IWSUserOrdersHistoryClose
  | IWSUserOrdersHistoryError
  | IWSUserOrdersHistoryGetMessage
  | IWSUserOrdersHistorySendMessage;
