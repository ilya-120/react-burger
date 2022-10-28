import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { getStoreIngredients } from "../../services/actions/amplifierActions/ingredients";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { color, titleModal } from "../../utils/data";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import Profile from "../../pages/Profile/Profile";
import UserProfile from "../../pages/UserProfile/UserProfile";
import Modal from "../Modal/Modal";

function App() {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();
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
          <Routes location={state?.backgroundLocation || location}>
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
            <Route
              path="/ingredients/:id"
              element={
                <>
                  <h1
                    className="text text_type_main-large pt-30 mt-3 pb-6"
                    style={{ textAlign: "center" }}
                  >
                    {titleModal}
                  </h1>
                  <IngredientDetails />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile/*" element={<Profile />}>
              <Route path="" element={<UserProfile />} />
            </Route>
          </Routes>
          {state?.backgroundLocation && (
            <Routes>
              <Route
                path="/ingredients/:id"
                element={
                  <Modal
                    title={titleModal}
                    onClose={() => {
                      navigate("/");
                    }}
                  >
                    <IngredientDetails />
                  </Modal>
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
}

export default App;
