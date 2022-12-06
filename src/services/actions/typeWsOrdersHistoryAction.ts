import { PayloadAction } from "@reduxjs/toolkit";
import { TWSData } from "../../utils/typeData";

import {
  WS_ORDERS_HISTORY_OPEN,
  WS_ORDERS_HISTORY_SEND_MESSAGE,
  WS_ORDERS_HISTORY_CLOSE,
  WS_ORDERS_HISTORY_GET_MESSAGE,
  WS_ORDERS_HISTORY_ERROR,
} from "./ws";

export const wsOrdersHistoryActions = {
  wsInit: WS_ORDERS_HISTORY_OPEN,
  wsSendMessage: WS_ORDERS_HISTORY_SEND_MESSAGE,
  onClose: WS_ORDERS_HISTORY_CLOSE,
  onMessage: WS_ORDERS_HISTORY_GET_MESSAGE,
  onError: WS_ORDERS_HISTORY_ERROR
};

export interface IWSOrdersHistoryStart {
  readonly type: typeof WS_ORDERS_HISTORY_OPEN;
}

export interface IWSOrdersHistoryClose {
  readonly type: typeof WS_ORDERS_HISTORY_CLOSE;
  readonly payload: PayloadAction;
}

export interface IWSOrdersHistoryError {
  readonly type: typeof WS_ORDERS_HISTORY_ERROR;
  readonly payload: PayloadAction;
}

export interface IWSOrdersHistoryGetMessage {
  readonly type: typeof WS_ORDERS_HISTORY_GET_MESSAGE;
  readonly payload: TWSData;
}

export interface IWSOrdersHistorySendMessage {
  readonly type: typeof WS_ORDERS_HISTORY_SEND_MESSAGE;
}

export type TWSOrdersHistoryActions =
  | IWSOrdersHistoryStart
  | IWSOrdersHistoryClose
  | IWSOrdersHistoryError
  | IWSOrdersHistoryGetMessage
  | IWSOrdersHistorySendMessage;
