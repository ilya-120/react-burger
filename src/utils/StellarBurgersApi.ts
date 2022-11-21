import { getCookie, setCookie } from "./utils";

type TUserDataForm = {
  name?: string;
  email: string;
  password?: string;
  token?: string;
};

type TOrder = {
  number?: string;
};

interface IApiData extends Response {
  readonly refreshToken?: string;
  readonly accessToken?: string;
  readonly success?: boolean;
  readonly order?: TOrder;
}

const BASE_URL = "https://norma.nomoreparties.space/api/";
const headers: HeadersInit = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const checkResponse = (res: Response): Promise<IApiData> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const updateAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const res = await fetch(`${BASE_URL}auth/token`, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: JSON.stringify({
      token: refreshToken
    })
  });
  const data = await checkResponse(res);
  setCookie("accessToken", data.accessToken as string);
  localStorage.setItem("refreshToken", data.refreshToken as string);
  return
}

export const logOut = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const res = await fetch(`${BASE_URL}auth/logout`, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: JSON.stringify({
      token: refreshToken
    })
  });
  return checkResponse(res);
}

export const getIngredients = async () => {
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
  return checkResponse(res);
};

export const signup = async (form: TUserDataForm) => {
  const res = await fetch(`${BASE_URL}auth/register`, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: JSON.stringify(form),
  });
  return checkResponse(res);
};

export const signin = async (form: TUserDataForm) => {
  const res = await fetch(`${BASE_URL}auth/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      ...headers,
    },
    body: JSON.stringify(form)
  });
  const data = await checkResponse(res);
  return data;
};

export const getUserInfo = async () => {
  const res = await fetch(`${BASE_URL}auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      ...headers,
      'Authorization': `${getCookie('accessToken')}`,
    }
  })
  return checkResponse(res);
}

export const setUserInfo = async (form: TUserDataForm) => {
  const res = await fetch(`${BASE_URL}auth/user`, {
    headers: {
      ...headers,
      'Authorization': `${getCookie('accessToken')}`,
    },
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    body: JSON.stringify(form)
  });
  return checkResponse(res);
}

export const forgotPassword = async (form: TUserDataForm) => {
  const res = await fetch(`${BASE_URL}password-reset`, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: JSON.stringify(form),
  });
  return checkResponse(res);
};

export const resetPassword = async (form: TUserDataForm) => {
  const res = await fetch(`${BASE_URL}password-reset/reset`, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: JSON.stringify(form),
  });
  return checkResponse(res);
};


