import { TIngredient } from "../../utils/typeData";
import { OPEN_SHOW_MODAL, CLOSE_SHOW_MODAL } from "./modalIngredient";

export interface IOpenShowModal {
  payload: TIngredient;
  readonly type: typeof OPEN_SHOW_MODAL;
}

export interface ICloseShowModal {
  readonly type: typeof CLOSE_SHOW_MODAL;
}

export type TModalActions = IOpenShowModal | ICloseShowModal;
