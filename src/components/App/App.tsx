import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { data } from "../utils/data";

function App() {
  return (
    <div className="root">
      <AppHeader />
      <main>
        <BurgerIngredients ingredients={data} />
        <BurgerConstructor ingredients={data} />
      </main>
    </div>
  );
}

export default App;
