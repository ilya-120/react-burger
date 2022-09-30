import React, { useRef } from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import Styles from './BurgerIngredients.module.css';
import BurgerIngredientsElement from './BurgerIngredientsElement';
import Buns from './Buns';
import Filling from './Filling';
import Sauces from './Sauces';

function BurgerIngredients({ ingredients }) {
  const pageRefs = useRef({});
  const [isBlock, setBlock] = React.useState('buns');

  const IngredientsList = (array) => {
    return array.map(element =>
      <BurgerIngredientsElement
        ingredient={element}
        key={element._id}
      />
    );
  }

  const dataProps = {
    pageRefs: pageRefs,
    ingredients: ingredients,
    ingredientsList: IngredientsList,
  }

  function scrollIntoView(type) {
    pageRefs.current[type].scrollIntoView();
  }

  return (
    <section className={`${Styles.section}`}>
      <h1 className='text text_type_main-large mt-10'>Соберите бургер</h1>
      <div className={`${Styles.tabs} mt-5 mb-10`}>
        <Tab
          value='buns'
          active={isBlock === 'buns'}
          onClick={() => { setBlock('buns'); scrollIntoView("buns") }}>
          Булки
        </Tab>
        <Tab
          value='sauces'
          active={isBlock === 'sauces'}
          onClick={() => { setBlock('sauces'); scrollIntoView("sauces") }}>
          Соусы
        </Tab>
        <Tab
          value='main'
          active={isBlock === 'main'}
          onClick={() => { setBlock('main'); scrollIntoView("main") }}>
          Начинки
        </Tab>
      </div>
      <div className={`${Styles.ingredients} custom-scroll`}>
        <Buns
          {...dataProps} />
        <Sauces
          {...dataProps} />
        <Filling
          {...dataProps} />
      </div>
    </section>
  );
}

export default BurgerIngredients;

