import { useEffect, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from "./BurgerIngredients.module.css";
import BurgerIngredientsType from "../BurgerIngredientsType/BurgerIngredientsType";
import { useSelector } from "react-redux";

const useIntersectionObserver = (ref) => {
  const [isOnScreen, setIsOnScreen] = useState(null);
  const observerRef = new IntersectionObserver(
    ([entry]) => setIsOnScreen(entry.isIntersecting),
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    }
  );

  useEffect(() => {
    observerRef.observe(ref.current);
    return () => observerRef.disconnect();
  }, [ref, observerRef]);

  return {
    isOnScreen,
  };
};

function BurgerIngredients() {
  const saucesRef = useRef();
  const bunsRef = useRef();
  const mainsRef = useRef();
  const observerBun = useIntersectionObserver(bunsRef);
  const observerSauces = useIntersectionObserver(saucesRef);
  const observerMain = useIntersectionObserver(mainsRef);

  const { buns, mains, sauces } = useSelector((store) => store.ingredients);

  const onTabClick = (ref) => ref.current.scrollIntoView();

  return (
    <section className={`${Styles.section}`}>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <div className={`${Styles.tabs} mt-5 mb-10`}>
        <Tab
          value="buns"
          active={observerBun.isOnScreen}
          onClick={() => onTabClick(bunsRef)}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={observerSauces.isOnScreen}
          onClick={() => onTabClick(saucesRef)}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={observerMain.isOnScreen}
          onClick={() => onTabClick(mainsRef)}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${Styles.ingredients} custom-scroll`}>
        <BurgerIngredientsType
          ingredients={buns}
          ingredient={"bun"}
          title={"Булки"}
          scroll={bunsRef}
        />
        <BurgerIngredientsType
          ingredients={sauces}
          ingredient={"sauce"}
          title={"Соусы"}
          scroll={saucesRef}
        />
        <BurgerIngredientsType
          ingredients={mains}
          ingredient={"main"}
          title={"Начинки"}
          scroll={mainsRef}
        />
      </div>
    </section>
  );
}

export default BurgerIngredients;
