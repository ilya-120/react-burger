import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { getStoreIngredients } from "../../services/actions/amplifierActions/ingredients";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { color } from "../../utils/data";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStoreIngredients());
  }, [dispatch]);

  const { success, errorText } = useSelector((store) => store.ingredients);

  return (
    <div className="root">
      {errorText && <p className="message">{errorText}</p>}
      {!success && !errorText && (
        <span className="message">
          <ClipLoader color={color} loading={!success} size={200} />
        </span>
      )}
      {!!success && !errorText && (
        <>
          <AppHeader />
          <Routes>
            <Route
              path="/"
              element={
                <DndProvider backend={HTML5Backend}>
                  <main>
                    <BurgerIngredients />
                    <BurgerConstructor />
                  </main>
                </DndProvider>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
