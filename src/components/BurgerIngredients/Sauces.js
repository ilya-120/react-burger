import { useMemo } from 'react';
import Styles from './BurgerIngredients.module.css';

function Sauces({ pageRefs, ingredients, ingredientsList }) {
  const sauces = ingredients.filter(element => element.type === 'sauce');
  const displaySauces = useMemo(() => ingredientsList(sauces), [ingredientsList, sauces]);
  return (
    <section className={`${Styles.sauces}`}
      ref={el => pageRefs.current = { ...pageRefs.current, sauces: el }}>
      <h2 className='text text_type_main-medium mb-6 mt-10' id='sauce'>Соусы</h2>
      <ul className={`${Styles['ingredients-element']} pl-4 pr-4`}>
        {displaySauces}
      </ul>
    </section>
  )
}

export default Sauces;
