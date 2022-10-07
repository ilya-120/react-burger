const BASE_URL = "https://norma.nomoreparties.space/api/ingredients";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

async function checkResponse(res) {
  if (res.ok) {
    return await res.json();
  } else {
    return Promise.reject(res.status);
  }
}

export const getIngredients = async () => {
  const res = await fetch(`${BASE_URL}`, {
    method: "GET",
    headers: {
      ...headers,
    },
  });
  return checkResponse(res);
};
