import { RefObject, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./BurgerIngredients.module.css";
import BurgerIngredientsType from "../BurgerIngredientsType/BurgerIngredientsType";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { FC } from "react";

import { constants } from "../../utils/data";
import { useAppSelector } from "../../hooks/hook";

const BurgerIngredients: FC = () => {
  const saucesRef = useRef<HTMLUListElement>(null);
  const bunsRef = useRef<HTMLUListElement>(null);
  const mainsRef = useRef<HTMLUListElement>(null);
  const observerBun = useIntersectionObserver(bunsRef);
  const observerSauces = useIntersectionObserver(saucesRef);
  const observerMain = useIntersectionObserver(mainsRef);

  const { buns, mains, sauces } = useAppSelector((store) => store.ingredients);

  const onTabClick = (ref: RefObject<HTMLUListElement>) =>
    ref.current?.scrollIntoView();

  return (
    <section className={`${Styles.section}`}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div data-testid="ingredient-tabs" className={`${Styles.tabs} mt-5 mb-10`}>
        <Tab
          value="buns"
          active={observerBun.isOnScreen}
          onClick={() => onTabClick(bunsRef)}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={observerBun.isOnScreen ? false : observerSauces.isOnScreen}
          onClick={() => onTabClick(saucesRef)}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={!observerSauces.isOnScreen ? observerMain.isOnScreen : false}
          onClick={() => onTabClick(mainsRef)}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${Styles.ingredients} custom-scroll`} id="container">
        <BurgerIngredientsType
          ingredients={buns}
          ingredient={constants.bun}
          title={"Булки"}
          ref={bunsRef}
        />
        <BurgerIngredientsType
          ingredients={sauces}
          ingredient={constants.sauce}
          title={"Соусы"}
          ref={saucesRef}
        />
        <BurgerIngredientsType
          ingredients={mains}
          ingredient={constants.main}
          title={"Начинки"}
          ref={mainsRef}
        />
      </div>
    </section>
  );
};

export default BurgerIngredients;
