import {
  ERROR_TEXT_GET_ORDER_NUMBER,
  GET_ORDER_NUMBER,
  RESET_OLD_ORDER_DATA,
  SUCCESS_GET_ORDER_NUMBER,
} from "./orders";

export interface IErrorTextGetOrderNumber {
  payload: string | null;
  readonly type: typeof ERROR_TEXT_GET_ORDER_NUMBER;
}

export interface IGetOrderNumber {
  payload: number | null;
  readonly type: typeof GET_ORDER_NUMBER;
}

export interface ISuccessGetOrderNumber {
  readonly type: typeof SUCCESS_GET_ORDER_NUMBER;
}

export interface IResetOldOrderData {
  readonly type: typeof RESET_OLD_ORDER_DATA;
}

export type TOrderActions =
  | IErrorTextGetOrderNumber
  | IGetOrderNumber
  | ISuccessGetOrderNumber
  | IResetOldOrderData;
