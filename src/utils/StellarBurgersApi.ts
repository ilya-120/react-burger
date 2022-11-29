import { TIngredient, TUserDataForm } from "./typeData";
import { getCookie, setCookie } from "./utils";

type TOrder = {
  order: { number: number };
};

type TLogout = {
  message?: string;
};

type TApiAuthResponse = {
  accessToken: string;
  refreshToken: string;
};

type TIngredientResponse = {
  data: TIngredient[];
};

type TApiData<T> = {
  success: boolean;
} & T &
  TApiAuthResponse;

const BASE_URL = "https://norma.nomoreparties.space/api/";
const headers: HeadersInit = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const checkResponse = <T>(res: Response) => {
  return res.ok
    ? res.json().then((data) => data as TApiData<T>)
    : res.json().then((err) => Promise.reject(err));
};

export const updateAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const res = await fetch(`${BASE_URL}auth/token`, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  });
  const data = await checkResponse<TApiAuthResponse>(res);
  setCookie("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  return;
};

export const logOut = async (): Promise<TApiData<TLogout>> => {
  const refreshToken = localStorage.getItem("refreshToken");
  const res = await fetch(`${BASE_URL}auth/logout`, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  });
  return checkResponse(res);
};

export const getIngredients = async (): Promise<
  TApiData<TIngredientResponse>
> => {
  const res = await fetch(`${BASE_URL}ingredients`, {
    method: "GET",
    headers: {
      ...headers,
    },
  });
  return checkResponse(res);
};

export const getOrderNumber = async (ingredients: string[]) => {
  const res = await fetch(`${BASE_URL}orders`, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: JSON.stringify(ingredients),
  });
  const data = await checkResponse<TOrder>(res);
  return data.order.number;
};

export const signup = async (
  form: TUserDataForm
): Promise<TApiData<TUserDataForm>> => {
  const res = await fetch(`${BASE_URL}auth/register`, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: JSON.stringify(form),
  });
  return checkResponse(res);
};

export const signin = async (
  form: TUserDataForm
): Promise<TApiData<TUserDataForm>> => {
  const res = await fetch(`${BASE_URL}auth/login`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      ...headers,
    },
    body: JSON.stringify(form),
  });
  const data = await checkResponse<TUserDataForm>(res);
  return data;
};

export const getUserInfo = async (): Promise<TApiData<TUserDataForm>> => {
  const res = await fetch(`${BASE_URL}auth/user`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      ...headers,
      Authorization: `${getCookie("accessToken")}`,
    },
  });
  return checkResponse(res);
};

export const setUserInfo = async (
  form: TUserDataForm
): Promise<TApiData<TUserDataForm>> => {
  const res = await fetch(`${BASE_URL}auth/user`, {
    headers: {
      ...headers,
      Authorization: `${getCookie("accessToken")}`,
    },
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify(form),
  });
  return checkResponse(res);
};

export const forgotPassword = async (
  form: TUserDataForm
): Promise<TApiData<TUserDataForm>> => {
  const res = await fetch(`${BASE_URL}password-reset`, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: JSON.stringify(form),
  });
  return checkResponse(res);
};

export const resetPassword = async (
  form: TUserDataForm
): Promise<TApiData<TUserDataForm>> => {
  const res = await fetch(`${BASE_URL}password-reset/reset`, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: JSON.stringify(form),
  });
  return checkResponse(res);
};
