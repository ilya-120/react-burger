import { useMemo } from 'react';
import Styles from './BurgerIngredients.module.css';

function Filling({ pageRefs, ingredients, ingredientsList }) {
  const isFilling = ingredients.filter(element => element.type === 'main');
  const displayMains = useMemo(() => ingredientsList(isFilling), []);
  return (
    <section className={`${Styles.main}`}
      ref={el => pageRefs.current = { ...pageRefs.current, main: el }}>
      <h2 className='text text_type_main-medium mb-6' id='main'>Начинки</h2>
      <ul className={`${Styles['ingredients-element']} pl-4 pr-4`}>
        {displayMains}
      </ul>
    </section>
  )
}

export default Filling;
