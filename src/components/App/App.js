import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { getStoreIngredients } from "../../services/actions/ingredients";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import {
  OrderNumberContext,
  BurgerConstructorContext,
} from "../utils/appContext";
import { color } from "../utils/data";
import { getIngredients, getOrderNumber } from "../utils/StellarBurgersApi";

function App() {
  const [burgerIngredients, setBurgerIngredients] = useState({
    success: false,
    error: false,
    errorText: "",
    data: [],
  });
  const [orderNumber, setOrderNumber] = useState(null);
  const [orderError, setOrderError] = useState("");
  const [orderData, setOrderData] = useState([]);
  const { success, error, data, errorText } = burgerIngredients;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStoreIngredients());
  }, [dispatch]);

  useEffect(() => {
    getIngredients()
      .then((res) => {
        setBurgerIngredients((burgerIngredients) => ({
          ...burgerIngredients,
          success: res.success,
          data: res.data,
        }));
        setOrderData(res.data);
      })
      .catch((err) => {
        setBurgerIngredients((burgerIngredients) => ({
          ...burgerIngredients,
          error: true,
          errorText: `Ошибка загрузки данных: ${err}`,
        }));
      });
  }, []);

  function requestOrderNumber(ingredients) {
    getOrderNumber(ingredients)
      .then((data) => {
        !data.success
          ? setOrderError('the order has not been created')
          : setOrderNumber(data.order.number);
      })
      .catch((err) => {
        setOrderError(err.message);
      });
  }

  return (
    !!data && (
      <div className="root">
        {error && <p className="message">{errorText}</p>}
        {!success && !error && (
          <span className="message">
            <ClipLoader color={color} loading={!success} size={200} />
          </span>
        )}
        {!!success && !error && (
          <>
            <AppHeader />
            <main>
              <BurgerIngredients />
              <BurgerConstructorContext.Provider
                value={{ orderData, setOrderData }}
              >
                <OrderNumberContext.Provider
                  value={{
                    orderNumber,
                    setOrderNumber,
                    orderError,
                    setOrderError,
                  }}
                >
                  <BurgerConstructor requestOrderNumber={requestOrderNumber} />
                </OrderNumberContext.Provider>
              </BurgerConstructorContext.Provider>
            </main>
          </>
        )}
      </div>
    )
  );
}

export default App;
