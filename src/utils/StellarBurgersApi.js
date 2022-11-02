import { getCookie, setCookie } from "./utils";

const BASE_URL = "https://norma.nomoreparties.space/api/";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const checkResponse = (res) => {
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
  const res_1 = await checkResponse(res);
  setCookie("accessToken", res_1.accessToken);
  localStorage.setItem("refreshToken", res_1.refreshToken);
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

export const getOrderNumber = async (ingredients) => {
  const res = await fetch(`${BASE_URL}orders`, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: JSON.stringify(ingredients),
  });
  return checkResponse(res);
};

export const signup = async (form) => {
  const res = await fetch(`${BASE_URL}auth/register`, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: JSON.stringify(form),
  });
  return checkResponse(res);
};

export const signin = async (form) => {
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
  const token = getCookie('accessToken');
  const res = await fetch(`${BASE_URL}auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      ...headers,
      'Authorization': token,
    }
  })
  return checkResponse(res);
}

export const setUserInfo = async (form) => {
  const token = getCookie('accessToken');
  const res = await fetch(`${BASE_URL}auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      ...headers,
      'Authorization': token,
    },
    body: JSON.stringify(form)
  });
  return checkResponse(res);
}

export const forgotPassword = async (form) => {
  const res = await fetch(`${BASE_URL}password-reset`, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: JSON.stringify(form),
  });
  return checkResponse(res);
};

export const resetPassword = async (form) => {
  const res = await fetch(`${BASE_URL}password-reset/reset`, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: JSON.stringify(form),
  });
  return checkResponse(res);
};


