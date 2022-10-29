const BASE_URL = "https://norma.nomoreparties.space/api/";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

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
