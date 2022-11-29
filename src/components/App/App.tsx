import { FC, useEffect } from "react";
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProtectedRouteResetPassword from "../ProtectedRoute/ProtectedRouteResetPassword";
import NotFound from "../../pages/NotFound/NotFound";
import ProtectedRouteOnLogin from "../ProtectedRoute/ProtectedRouteOnLogin";
import { userRequest } from "../../services/actions/amplifierActions/user";
import { getCookie } from "../../utils/utils";
import { RootState } from "../../services/reducers";

interface ILocationState {
  backgroundLocation?: string;
}

const App: FC = () => {
  const location = useLocation();
  const state = location.state as ILocationState;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch((getStoreIngredients as any)());
    const token = getCookie("accessToken");
    if (token) dispatch((userRequest as any)());
  }, [dispatch]);

  const { success, errorText } = useSelector(
    (store: RootState) => store.ingredients
  );

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
                  <h1 className="title text text_type_main-large pt-30 mt-3 pb-6">
                    {titleModal}
                  </h1>
                  <IngredientDetails />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRouteOnLogin>
                  <Login />
                </ProtectedRouteOnLogin>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRouteOnLogin>
                  <Register />
                </ProtectedRouteOnLogin>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <ProtectedRouteOnLogin>
                  <ForgotPassword />
                </ProtectedRouteOnLogin>
              }
            />
            <Route
              path="/reset-password"
              element={
                <ProtectedRouteOnLogin>
                  <ProtectedRouteResetPassword>
                    <ResetPassword />
                  </ProtectedRouteResetPassword>
                </ProtectedRouteOnLogin>
              }
            />
            <Route
              path="/profile/*"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            >
              <Route
                path=""
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
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
};

export default App;
