const BASE_URL = "https://norma.nomoreparties.space/api/ingredients";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = async () => {
  const res = await fetch(`${BASE_URL}`, {
    method: "GET",
    headers: {
      ...headers,
    },
  });
  return checkResponse(res);
};
