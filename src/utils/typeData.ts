import { ReactElement } from "react";

export interface ILocationState {
  backgroundLocation?: string;
}

export type TIngredient = {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly __v: number;
  readonly _id: string;
  id?: string;
  index: number;
};

export interface IUserTypes {
  name: string;
  email: string;
}

export type TUserDataForm = {
  name?: string;
  email?: string;
  password?: string;
  token?: string;
  user?: IUserTypes;
};

export interface IProtectedRoute {
  children: ReactElement;
}

export type TFunctionVoid = () => void;

export type TOrderData = {
  _id: string;
  ingredients: Array<string>;
  name: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TWSData = {
  success: boolean;
  orders: TOrderData[];
  total: number;
  totalToday: number;
};

export type TWSOrdersHistory = {
  wsInit: string;
  wsSendMessage: string;
  onClose: string;
  onMessage: string;
  onError: string;
};
