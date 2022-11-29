import {
  OPEN_SHOW_MODAL_ORDER_NUMBER,
  CLOSE_SHOW_MODAL_ORDER_NUMBER,
} from "./modalOrder";

export interface IOpenShowModalOrderNumber {
  readonly type: typeof OPEN_SHOW_MODAL_ORDER_NUMBER;
}

export interface ICloseShowModalOrderNumber {
  readonly type: typeof CLOSE_SHOW_MODAL_ORDER_NUMBER;
}

export type TModalOrderActions =
  | IOpenShowModalOrderNumber
  | ICloseShowModalOrderNumber;
