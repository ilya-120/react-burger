import React, { useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./BurgerIngredients.module.css";
import BurgerIngredientsElement from "../BurgerIngredientsElement/BurgerIngredientsElement";
import BurgerIngredientsType from "../BurgerIngredientsType/BurgerIngredientsType";
import PropTypes from "prop-types";

function BurgerIngredients({ ingredients }) {
  const pageRefs = useRef({});
  const [isBlock, setBlock] = React.useState("buns");
  const buns = (el) => (pageRefs.current = { ...pageRefs.current, buns: el });
  const sauces = (el) =>
    (pageRefs.current = { ...pageRefs.current, sauces: el });
  const main = (el) => (pageRefs.current = { ...pageRefs.current, main: el });

  const IngredientsList = (array) => {
    return array.map((element) => (
      <BurgerIngredientsElement ingredient={element} key={element._id} />
    ));
  };

  const dataProps = {
    ingredients: ingredients,
    ingredientsList: IngredientsList,
  };

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
        <Tab
          value="buns"
          active={isBlock === "buns"}
          onClick={() => {
            onTabClick("buns");
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={isBlock === "sauces"}
          onClick={() => {
            onTabClick("sauces");
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={isBlock === "main"}
          onClick={() => {
            onTabClick("main");
          }}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${Styles.ingredients} custom-scroll`}>
        <BurgerIngredientsType
          {...dataProps}
          ingredient={"bun"}
          title={"Булки"}
          scroll={buns}
        />
        <BurgerIngredientsType
          {...dataProps}
          ingredient={"sauce"}
          title={"Соусы"}
          scroll={sauces}
        />
        <BurgerIngredientsType
          {...dataProps}
          ingredient={"main"}
          title={"Начинки"}
          scroll={main}
        />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default BurgerIngredients;
