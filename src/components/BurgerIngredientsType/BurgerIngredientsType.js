import { useMemo } from 'react';
import Styles from './BurgerIngredientsType.module.css';

function BurgerIngredientsType({ ingredients, ingredientsList, ingredient, title, scroll }) {
  const isIngredient = ingredients.filter(element => element.type === ingredient);
  const displayIsIngredients = useMemo(() => ingredientsList(isIngredient), [ingredientsList, isIngredient]);

  return (
    <section
      ref={scroll} >
      <h2 className='text text_type_main-medium mb-6' id={ingredient}>{title}</h2>
      <ul className={`${Styles['ingredients-element']} pl-4 pr-4`}>
        {displayIsIngredients}
      </ul>
    </section>
  )
}

export default BurgerIngredientsType;
