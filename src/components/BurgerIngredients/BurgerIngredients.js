import React, { useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./BurgerIngredients.module.css";
import BurgerIngredientsType from "../BurgerIngredientsType/BurgerIngredientsType";
import { useSelector } from "react-redux";

function BurgerIngredients() {
  const pageRefs = useRef({});
  const [isBlock, setBlock] = React.useState("buns");
  const scrollBuns = (el) =>
    (pageRefs.current = { ...pageRefs.current, buns: el });
  const scrollSauces = (el) =>
    (pageRefs.current = { ...pageRefs.current, sauces: el });
  const scrollMain = (el) =>
    (pageRefs.current = { ...pageRefs.current, main: el });

  const { buns, mains, sauces } = useSelector((store) => store.ingredients);

  function scrollIntoView(type) {
    pageRefs.current[type].scrollIntoView();
  }

  const onTabClick = (tab) => {
    setBlock(tab);
    scrollIntoView(tab);
  };

  return (
    <section className={`${Styles.section}`}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div className={`${Styles.tabs} mt-5 mb-10`}>
        <Tab value="buns" active={isBlock === "buns"} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="sauces" active={isBlock === "sauces"} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value="main" active={isBlock === "main"} onClick={onTabClick}>
          Начинки
        </Tab>
      </div>
      <div className={`${Styles.ingredients} custom-scroll`}>
        <BurgerIngredientsType
          ingredients={buns}
          ingredient={"bun"}
          title={"Булки"}
          scroll={scrollBuns}
        />
        <BurgerIngredientsType
          ingredients={sauces}
          ingredient={"sauce"}
          title={"Соусы"}
          scroll={scrollSauces}
        />
        <BurgerIngredientsType
          ingredients={mains}
          ingredient={"main"}
          title={"Начинки"}
          scroll={scrollMain}
        />
      </div>
    </section>
  );
}

export default BurgerIngredients;
