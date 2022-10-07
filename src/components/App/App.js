import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { getIngredients } from "../utils/StellarBurgersApi";

function App() {
  const [burgerIngredients, setBurgerIngredients] = useState({
    success: false,
    error: false,
    errorText: "",
    data: [],
  });
  const { success, error, data, errorText } = burgerIngredients;

  useEffect(() => {
    getIngredients()
      .then((res) => {
        setBurgerIngredients((burgerIngredients) => ({
          ...burgerIngredients,
          success: res.success,
          data: res.data,
        }));
      })
      .catch((err) => {
        setBurgerIngredients((burgerIngredients) => ({
          ...burgerIngredients,
          error: true,
          errorText: `Ошибка загрузки данных: ${err}`,
        }));
      });
  }, []);

  return (
    !!data && (
      <div className="root">
        {error && <p className="message">{errorText}</p>}
        {!success && !error && (
          <span className="message">
            <ClipLoader color={"#165b97"} loading={!success} size={200} />
          </span>
        )}
        {!!success && !error && (
          <>
            <AppHeader />
            <main>
              <BurgerIngredients ingredients={data} />
              <BurgerConstructor ingredients={data} />
            </main>
          </>
        )}
      </div>
    )
  );
}

export default App;
