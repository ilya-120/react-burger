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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStoreIngredients());
  }, [dispatch]);

  const { success, errorText } = useSelector(
    (store) => store.ingredients
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
          <DndProvider backend={HTML5Backend}>
            <main>
              <BurgerIngredients />
              <BurgerConstructor />
            </main>
          </DndProvider>
        </>
      )}
    </div>
  );
}

export default App;
