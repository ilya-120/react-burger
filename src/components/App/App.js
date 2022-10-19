import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { getStoreIngredients } from "../../services/actions/ingredients";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import {
  OrderNumberContext
} from "../utils/appContext";
import { color } from "../utils/data";
import { getOrderNumber } from "../utils/StellarBurgersApi";

function App() {
  const [orderNumber, setOrderNumber] = useState(null);
  const [orderError, setOrderError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStoreIngredients());
  }, [dispatch]);

  const { success, error, errorText } = useSelector(
    (store) => store.ingredients
  );

  function requestOrderNumber(ingredients) {
    getOrderNumber(ingredients)
      .then((data) => {
        !data.success
          ? setOrderError("the order has not been created")
          : setOrderNumber(data.order.number);
      })
      .catch((err) => {
        setOrderError(err.message);
      });
  }

  return (
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
          </main>
        </>
      )}
    </div>
  );
}

export default App;
