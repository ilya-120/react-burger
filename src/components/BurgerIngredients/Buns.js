import { useMemo } from 'react';
import Styles from './BurgerIngredients.module.css';

function Buns({ pageRefs, ingredients, ingredientsList }) {
  const isBuns = ingredients.filter(element => element.type === 'bun');
  const displayBuns = useMemo(() => ingredientsList(isBuns), []);
  return (
    <section className={`${Styles.buns}`}
      ref={el => pageRefs.current = { ...pageRefs.current, buns: el }}>
      <h2 className='text text_type_main-medium mb-6' id='bun'>Булки</h2>
      <ul className={`${Styles['ingredients-element']} pl-4 pr-4`}>
        {displayBuns}
      </ul>
    </section>
  )
}

export default Buns;
