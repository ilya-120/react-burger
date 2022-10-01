import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Styles from './BurgerIngredientsElement.module.css';
import { elementsPropType } from '../utils/PropTypes'

const BurgerIngredientsElement = ({ ingredient }) => {

  return (
    <li className={`${Styles.element} mb-8`}>
      <div>
        {(ingredient.count >= 1) ?
          (<Counter
            size="default"
            count={ingredient.count} />) : ('')}
        <img
          className='ml-4 mr-4 mb-1'
          src={ingredient.image}
          alt={ingredient.name}
        />
        <div className={`${Styles.currency} mb-1`}>
          <span className='text text_type_digits-default'>
            {ingredient.price}
          </span>
          &nbsp;<CurrencyIcon />
        </div>
        <span className='text text_type_main-small'>
          {ingredient.name}
        </span>
      </div>
    </li>
  )
}

BurgerIngredientsElement.propTypes = { elementsPropType }.isRequired

export default BurgerIngredientsElement;
