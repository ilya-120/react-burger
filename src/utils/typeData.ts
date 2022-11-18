import { ReactElement } from "react";

export type TUserDataForm = {
  name?: string;
  email: string;
  password?: string;
  token?: string;
};

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

export type TRef<T> = {
  title: string;
  ingredients: T[];
  ingredient: string;
};

export type TBurgerConstructorElementProps<T> = {
  element: T;
  index: number;
  moveIngredient: (dIndex: number, hIndex: number) => void;
};

export type TBurgerIngredientsElementProps<T> = {
  ingredient: T
};

export type TOverlayProps = {
  onClick: () => void;
};

export type TModalProps = {
  title?: string;
  onClose: () => void;
  children: React.ReactNode
};

export interface IProtectedRoute {
  children: ReactElement;
}
