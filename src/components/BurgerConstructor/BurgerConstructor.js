import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import Styles from './BurgerConstructor.module.css';
import { elementsPropType } from '../utils/PropTypes'

function BurgerConstructor({ ingredients }) {
  const burgerComponentInside = ingredients.filter(element => element.type !== 'bun');
  const burgerComponentOutside = ingredients.filter(element => element.type === 'bun');

  const IngredientsList = (array) => {
    return array.map(element => (
      <li key={element._id} className={`${Styles['list-element']}`}>
        <DragIcon />
        <div className={`${Styles.div} ml-2 mr-2`}>
          <ConstructorElement
            text={element.name}
            price={element.price}
            thumbnail={element.image}
          />
        </div>
      </li>
    )
    );
  }

  return (
    <section className={`${Styles.section - constructor}`}>
      <div className={`${Styles.div} pt-25 pb-2 ml-3`}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text={`${burgerComponentOutside[0].name} (верх)`}
          price={burgerComponentOutside[0].price}
          thumbnail={burgerComponentOutside[0].image}
        />
      </div>
      <ul className={`${Styles.list} custom-scroll`}>
        {IngredientsList(burgerComponentInside)}
      </ul>
      <div className={`${Styles.div} ml-3`}>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text={`${burgerComponentOutside[0].name} (низ)`}
          price={burgerComponentOutside[0].price}
          thumbnail={burgerComponentOutside[0].image}
        />
      </div>
      <div className={`${Styles.order}`}>
        <div className={`${Styles.price} ml-3`}>
          <p className="text text_type_digits-medium pr-2">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="submit" type="primary" size="large">Оформить заказ</Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = { elementsPropType }.isRequired

export default BurgerConstructor;

