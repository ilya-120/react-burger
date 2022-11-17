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
};

export type TRef<T> = {
  title: string;
  ingredients: T[];
  ingredient: string;
};
